import { motion } from "framer-motion";

const shadowLight = "shadow-[inset_0_1px_0_var(--shadow-hi),0_1px_2px_var(--shadow-soft),0_8px_16px_-10px_var(--shadow-strong)]";
const shadowLightHover =
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_2px_6px_rgba(20,22,31,0.12),0_16px_26px_-10px_rgba(20,22,31,0.38)]";
const shadowDark =
  "shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_1px_2px_rgba(0,0,0,0.3),0_8px_16px_-10px_rgba(0,0,0,0.5)]";
const shadowDarkHover =
  "hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_2px_6px_rgba(0,0,0,0.18),0_16px_26px_-10px_rgba(0,0,0,0.4)]";

export default function TagCloud({ tags, dark = false }: { tags: string[]; dark?: boolean }) {
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
            className={`inline-block cursor-default select-none rounded-[18px_4px_18px_4px] px-4 py-1.5 text-sm font-semibold transition-all duration-200 ease-out will-change-transform hover:scale-[1.03] ${
              dark
                ? `bg-navy-soft text-fixed-light/85 ${shadowDark} ${shadowDarkHover} hover:bg-fixed-light hover:text-navy`
                : `bg-card text-ink/75 ${shadowLight} ${shadowLightHover} hover:bg-navy hover:text-fixed-light`
            }`}
          >
            {tag}
          </span>
        </motion.li>
      ))}
    </motion.ul>
  );
}
