import { motion } from "framer-motion";

export default function Letras({ 
  letter, 
  ritmo = 1, 
  isExiting = false, 
  className = "" 
}) {

  const generarAnimacionSalida = () => ({
    y: -Math.random() * 150 - 50,
    x: (Math.random() - 0.5) * 100,
    opacity: 0,
    rotate: (Math.random() - 0.5) * 30,
    transition: {
      duration: Math.random() * 0.6 + 0.3,
      delay: Math.random() * 0.4,
      ease: "easeOut"
    }
  });


  if (isExiting) {
    const animacion = generarAnimacionSalida();

    return (
      <motion.span
        className={`inline-block font-spacex font-display ${className}`}
        initial={{ y: 0, opacity: 1, x: 0, rotate: 0 }}
        animate={animacion}
        transition={animacion.transition}
      >
        {letter === " " ? "\u00A0" : letter}
      </motion.span>
    );
  }

  return (
    <motion.span
      className={`inline-block font-display ${className}`}
      animate={{
        opacity: [1, 0, 1, 0, 1, 0, 1]
      }}
      transition={{
        duration: ritmo,
        repeat: 0,
        ease: "linear",
        times: [0, 0.15, 0.3, 0.45, 0.6, 0.75, 1]
      }}
    >
      {letter === " " ? "\u00A0" : letter}
    </motion.span>
  );
}