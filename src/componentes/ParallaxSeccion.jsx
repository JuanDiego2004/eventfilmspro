import { useTransform, motion } from "framer-motion";

export function ParallaxSeccion( { children, bg, index, scrollY }) {
    const vh = typeof window !== "undefined" ? window.innerHeight : 800;
    const start = index * vh;
    const end = start + vh;

    //Efecto suave al hacer Scroll
    const yContentido = useTransform(scrollY, [start, end], [0, -60]);
    const opacidad = useTransform(scrollY, [start, start + vh * 0.5], [1,0])

    return (
        <section
        className={`relative h-screen w-full snap-start snap-always overflow-hidden ${bg}`}
        >
           <motion.div
             style={{ y: yContentido,opacity: opacidad}}
             className="h-full w-full flex items-center justify-center"
           >
             {children}
           </motion.div>
        </section>
    )
}