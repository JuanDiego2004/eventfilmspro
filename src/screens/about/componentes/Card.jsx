import { motion } from "framer-motion"

export default function CardServicio({ titulo, descripcion, tag, video, index, esVisible, desdeIzquierda = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: desdeIzquierda ? -200 : 200 }}
      animate={esVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: desdeIzquierda ? -200 : 200 }}
      transition={{ duration: 3, delay: index * 0.12, ease: "easeOut" }}
      className="relative w-full h-full min-h-[140px] rounded-2xl overflow-hidden group cursor-pointer flex-shrink-0"
    >

      <video
        src={video}
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

      <div className="absolute bottom-0 left-0 right-0 p-3 backdrop-blur-sm bg-black/20 border-t border-white/10">
        <span className="text-white text-[13px] uppercase tracking-[0.2em] font-semibold block mb-0.5">
          {tag}
        </span>
        <h3 className="text-white font-bold text-[16] leading-tight">
          {titulo}
        </h3>
        <p className="text-white/60 text-[15px] leading-relaxed mt-0.5 line-clamp-2">
          {descripcion}
        </p>
      </div>

      <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />
    </motion.div>
  )
}