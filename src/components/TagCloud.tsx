import { motion } from "framer-motion";

const shadowLight = "shadow-[inset_0_1px_0_var(--shadow-hi),0_1px_2px_var(--shadow-soft),0_8px_16px_-10px_var(--shadow-strong)]";
// Deliberately its own tuned recipe, not a duplicate of shadowLight's
// tokens — a softer inset highlight (0.15 vs. --shadow-hi's 0.9) paired
// with a stronger drop shadow reads as "lifted" on hover without blowing
// out, which the resting-state tokens above aren't tuned for.
const shadowLightHover =
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(20,22,31,0.12),0_16px_26px_-10px_rgba(20,22,31,0.38)]";

export default function TagCloud({ tags }: { tags: string[] }) {
  return (
    <motion.ul
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ show: { transition: { staggerChildren: 0.035 } } }}
      className="flex flex-wrap gap-3"
    >
      {tags.map((tag, i) => (
        <motion.li
          key={i}
          variants={{
            hidden: { opacity: 0, y: 10, scale: 0.9 },
            show: { opacity: 1, y: 0, scale: 1 },
          }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <span
            className={`inline-block cursor-default select-none rounded-[18px_4px_18px_4px] bg-card px-4 py-1.5 text-sm font-semibold text-ink/75 transition-all duration-200 ease-out will-change-transform hover:scale-[1.03] hover:bg-accent hover:text-on-accent ${shadowLight} ${shadowLightHover}`}
          >
            {tag}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
