import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function TiltImage({ src, alt, className = "" }: { src: string; alt: string; className?: string }) {
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const spring = { stiffness: 150, damping: 20, mass: 0.6 };
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), spring);
  const ry = useSpring(useTransform(mx, [0, 1], [-6, 6]), spring);
  const scaleSpring = useSpring(1, spring);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseEnter={() => scaleSpring.set(1.03)}
      onMouseLeave={() => {
        mx.set(0.5);
        my.set(0.5);
        scaleSpring.set(1);
      }}
      style={{ rotateX: rx, rotateY: ry, scale: scaleSpring, transformPerspective: 900 }}
      className={`overflow-hidden rounded-3xl ${className}`}
    >
      <img src={src} alt={alt} className="h-full w-full object-cover" draggable={false} />
    </motion.div>
  );
}
