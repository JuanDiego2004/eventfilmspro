'use client';

import { motion, useInView } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export const ParpadeoElectrico = ({
  children,
  className = '',
  inicio = 0,
  duracionActiva = 4000,
  intervalo = 80, 
  intensidad = 0.1,
}) => {
  const [parpadeo, setParpadeo] = useState(true);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });

  useEffect(() => {
    if (!isInView) {
      setParpadeo(true); 
      return;
    }

    let startTimeout;
    let flickerInterval;
    let stopTimeout;

    startTimeout = setTimeout(() => {
      flickerInterval = setInterval(() => {
        setParpadeo((prev) => !prev);
      }, intervalo);

      stopTimeout = setTimeout(() => {
        clearInterval(flickerInterval);
        setParpadeo(true);
      }, duracionActiva);
    }, inicio);

    return () => {
      clearTimeout(startTimeout);
      clearTimeout(stopTimeout);
      clearInterval(flickerInterval);
    };
  }, [isInView, inicio, duracionActiva, intervalo]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{
        opacity: parpadeo ? 1 : intensidad,
        filter: parpadeo ? 'brightness(1)' : 'brightness(2) contrast(2)',
        scale: parpadeo ? 1 : 0.995,
      }}
      transition={{ duration: 0.05 }}
    >
      {children}
    </motion.div>
  );
};