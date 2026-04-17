
import { motion, AnimatePresence } from "framer-motion";
import TextoAnimado from "./TextoAnimado";

export default function GlitchOverlay({ show, isExiting }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="h-screen w-full bg-black/80 backdrop-blur-lg fixed inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
        >
          <TextoAnimado className="text-6xl text-white font-spacex" text="FILMS PRO" isExiting={isExiting} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}