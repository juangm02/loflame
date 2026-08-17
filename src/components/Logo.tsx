import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import LogoMark from "./LogoMark";

export default function Logo({ to = "/" }: { to?: string }) {
  return (
    <Link to={to} aria-label="Juan García Márquez" className="inline-flex items-center">
      <motion.span
        whileHover={{ scale: 1.06 }}
        transition={{ type: "spring", stiffness: 300, damping: 12 }}
        className="inline-flex"
      >
        <LogoMark className="h-8 w-auto text-ink" />
      </motion.span>
    </Link>
  );
}
