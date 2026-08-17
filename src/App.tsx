import { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Portfolio from "./pages/Portfolio";
import Curriculum from "./pages/Curriculum";
import CaseStudy from "./pages/CaseStudy";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" as ScrollBehavior });
  }, [pathname]);
  return null;
}

function PageTransition({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const location = useLocation();

  return (
    <div id="top">
      <ScrollToTop />
      <AnimatePresence mode="wait" initial={false}>
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <PageTransition>
                <Portfolio />
              </PageTransition>
            }
          />
          <Route
            path="/curriculum"
            element={
              <PageTransition>
                <Curriculum />
              </PageTransition>
            }
          />
          <Route
            path="/proyectos/:slug"
            element={
              <PageTransition>
                <CaseStudy />
              </PageTransition>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
}
