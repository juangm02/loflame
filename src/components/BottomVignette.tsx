const HEIGHT = 70; // px

/**
 * Fixed to the viewport (not the page), on every route — whatever sits near
 * the bottom edge of the screen fades into the page background instead of
 * getting a hard cut. Site-wide polish, not tied to any one page's content.
 */
export default function BottomVignette() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 bottom-0 z-40"
      style={{ height: HEIGHT, background: "linear-gradient(to top, var(--color-paper), transparent)" }}
    />
  );
}
