import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export const TextoEscritura = ({
  text,
  className = '',
  inicio = 7000, 
}) => {
  const [startEffect, setStartEffect] = useState(false);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 }); 

  useEffect(() => {
    if (!isInView) {
      setStartEffect(false);
      return;
    }
    const timer = setTimeout(() => setStartEffect(true), inicio);
    return () => clearTimeout(timer);
  }, [isInView, inicio]); 

  const words = text.split(' ');

  const variants = {
    hidden: { opacity: 0, y: 10 },
    show: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 },
    }),
  };

  return (
    <div ref={ref} className={`font-bold tracking-tighter ${className}`}>
      {!startEffect ? (
        <h2 className="invisible">{text}</h2>
      ) : (
        <motion.h2
          initial="hidden"
          animate={isInView ? 'show' : 'hidden'}
          className="flex flex-wrap gap-x-[0.25em]"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              custom={i}
              variants={variants}
              className="inline-block"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>
      )}
    </div>
  );
};