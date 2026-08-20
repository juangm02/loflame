import { useEffect, useRef } from "react";
import { useIsDarkTheme } from "../lib/useIsDarkTheme";

/**
 * Decorative cloth-simulation background, ported from the Processing sketch
 * `Landing_2sketch_260820c.pde` (mass-spring grid + mouse ripple) to plain
 * Canvas 2D — no extra runtime dependency, no p5.js.
 *
 * The canvas is `pointer-events: none` so it never blocks clicks on the real
 * header/hero content stacked above it; mouse position is tracked with a
 * window-level listener instead of canvas-local events, so the hover ripple
 * still works when the cursor is over text or buttons. The click-to-grab and
 * "d"-to-cut easter eggs from the original sketch were dropped for this
 * reason (a background layer can't safely eat clicks meant for the CTA).
 *
 * Colors are theme-aware via `useIsDarkTheme` (see [[dark-mode-accessibility]]):
 * the mesh's background and thread grays already lined up almost exactly with
 * the dark-mode paper/ghost tokens, so only the light-mode fallback needed
 * real new numbers.
 */

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  fixed: boolean;
}

interface Spring {
  a: number;
  b: number;
  length: number;
}

// Physics constants, carried over 1:1 from the .pde sketch.
const STIFFNESS = 0.2;
const DAMPING = 0.9;
const GRAVITY = 0.12;
const GRAVITY_DURATION = 8; // seconds the initial sag plays for
const REPULSION_RADIUS = 45;
const WAVE_RADIUS = 95;
const WAVE_WIDTH = 22;
const INTERACTION_RADIUS = 145;
const REPULSION_STRENGTH = 0.75;
const WAVE_STRENGTH = 1.2;
const EDGE_FADE = 15;
const INITIAL_STRETCH = 2;

// Web-tuned mesh density: looser than the original 20/10px spacing, and
// capped outright, so frame time stays sane on wide desktop viewports.
const SPACING_X = 26;
const SPACING_Y = 16;
const MAX_COLS = 70;
const MAX_ROWS = 34;

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}
function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}
function smoothstep(t: number) {
  return t * t * (3 - 2 * t);
}

export default function ClothBackground({ className }: { className?: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isDark = useIsDarkTheme();

  useEffect(() => {
    const containerEl = containerRef.current;
    const canvasEl = canvasRef.current;
    if (!containerEl || !canvasEl) return;
    const ctx2d = canvasEl.getContext("2d");
    if (!ctx2d) return;
    // Re-bind with explicit non-nullable types: closures declared below
    // (resize/step/drawFrame) don't retain the narrowing above.
    const container: HTMLDivElement = containerEl;
    const canvas: HTMLCanvasElement = canvasEl;
    const ctx: CanvasRenderingContext2D = ctx2d;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let particles: Particle[] = [];
    let springs: Spring[] = [];
    let width = 0;
    let height = 0;
    let mouseX = -9999;
    let mouseY = -9999;
    let raf = 0;
    let running = false;
    const startTime = performance.now();

    function buildCloth(w: number, h: number) {
      let spacingX = SPACING_X;
      let spacingY = SPACING_Y;
      let cols = Math.max(2, Math.ceil(w / spacingX) + 1);
      let rows = Math.max(2, Math.ceil(h / spacingY) + 1);
      if (cols > MAX_COLS) {
        spacingX = w / MAX_COLS;
        cols = MAX_COLS + 1;
      }
      if (rows > MAX_ROWS) {
        spacingY = h / MAX_ROWS;
        rows = MAX_ROWS + 1;
      }

      particles = [];
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          particles.push({
            x: i * spacingX,
            y: j * (spacingY + INITIAL_STRETCH),
            vx: 0,
            vy: 0,
            ax: 0,
            ay: 0,
            fixed: j === 0,
          });
        }
      }

      springs = [];
      const idx = (i: number, j: number) => i * rows + j;
      const dist = (p1: Particle, p2: Particle) => Math.hypot(p1.x - p2.x, p1.y - p2.y);
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          if (i > 0) {
            const a = idx(i, j);
            const b = idx(i - 1, j);
            springs.push({ a, b, length: dist(particles[a], particles[b]) });
          }
          if (j > 0) {
            const a = idx(i, j);
            const b = idx(i, j - 1);
            springs.push({ a, b, length: dist(particles[a], particles[b]) });
          }
        }
      }
    }

    function resize() {
      const rect = container.getBoundingClientRect();
      width = Math.max(1, Math.round(rect.width));
      height = Math.max(1, Math.round(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildCloth(width, height);
      drawFrame();
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    }
    function onMouseLeave() {
      mouseX = -9999;
      mouseY = -9999;
    }

    function gravityActive() {
      return (performance.now() - startTime) / 1000 < GRAVITY_DURATION;
    }

    function step() {
      for (const s of springs) {
        const p1 = particles[s.a];
        const p2 = particles[s.b];
        let dx = p2.x - p1.x;
        let dy = p2.y - p1.y;
        const currentLength = Math.hypot(dx, dy);
        if (currentLength < 0.001) continue;
        const diff = currentLength - s.length;
        dx /= currentLength;
        dy /= currentLength;
        const fx = dx * STIFFNESS * diff;
        const fy = dy * STIFFNESS * diff;
        if (!p1.fixed) {
          p1.ax += fx;
          p1.ay += fy;
        }
        if (!p2.fixed) {
          p2.ax -= fx;
          p2.ay -= fy;
        }
      }

      const gActive = gravityActive();
      for (const p of particles) {
        if (p.fixed) continue;

        if (gActive) p.ay += GRAVITY;

        const dx = p.x - mouseX;
        const dy = p.y - mouseY;
        const d = Math.hypot(dx, dy);
        if (d < INTERACTION_RADIUS && d > 0.001) {
          const ndx = dx / d;
          const ndy = dy / d;

          if (d < REPULSION_RADIUS) {
            let t = 1 - d / REPULSION_RADIUS;
            t *= t;
            p.ax += ndx * t * REPULSION_STRENGTH;
            p.ay += ndy * t * REPULSION_STRENGTH;
          }

          const ringDistance = Math.abs(d - WAVE_RADIUS);
          if (ringDistance < WAVE_WIDTH) {
            let t = 1 - ringDistance / WAVE_WIDTH;
            t *= t;
            p.ax += -ndx * t * WAVE_STRENGTH;
            p.ay += -ndy * t * WAVE_STRENGTH;
          }
        }

        p.vx = (p.vx + p.ax) * DAMPING;
        p.vy = (p.vy + p.ay) * DAMPING;
        p.x += p.vx;
        p.y += p.vy;
        p.ax = 0;
        p.ay = 0;
      }
    }

    function drawFrame() {
      const dark = isDark;
      const bg = dark ? "#131316" : "#f1f0ee";
      const outsideGray = dark ? 55 : 200;
      const waveGray = dark ? 120 : 90;
      const centerGray = dark ? 25 : 235;

      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, width, height);
      ctx.lineWidth = 1;

      for (const s of springs) {
        const p1 = particles[s.a];
        const p2 = particles[s.b];
        const cx = (p1.x + p2.x) * 0.5;
        const cy = (p1.y + p2.y) * 0.5;
        const d = Math.hypot(cx - mouseX, cy - mouseY);
        const ringDistance = Math.abs(d - WAVE_RADIUS);

        let gray = outsideGray;

        if (d < REPULSION_RADIUS + EDGE_FADE) {
          let t = 1 - (d - REPULSION_RADIUS) / EDGE_FADE;
          t = smoothstep(clamp(t, 0, 1));
          gray = lerp(outsideGray, centerGray, t);
        }

        const waveStart = WAVE_WIDTH + EDGE_FADE;
        if (ringDistance < waveStart) {
          let t = 1 - ringDistance / waveStart;
          t = smoothstep(clamp(t, 0, 1));
          gray = lerp(gray, waveGray, t);
        }

        ctx.strokeStyle = `rgb(${gray},${gray},${gray})`;
        ctx.beginPath();
        ctx.moveTo(p1.x, p1.y);
        ctx.lineTo(p2.x, p2.y);
        ctx.stroke();
      }
    }

    function loop() {
      step();
      drawFrame();
      raf = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduceMotion) return;
      running = true;
      raf = requestAnimationFrame(loop);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(raf);
    }

    resize();
    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseleave", onMouseLeave);

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) start();
          else stop();
        }
      },
      { threshold: 0 }
    );
    io.observe(container);

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
    };
    // Re-runs (and redraws once) whenever the theme flips, since dark/light
    // use different mesh colors.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  return (
    <div ref={containerRef} className={`pointer-events-none ${className ?? ""}`} aria-hidden="true">
      <canvas ref={canvasRef} className="block h-full w-full" />
    </div>
  );
}
