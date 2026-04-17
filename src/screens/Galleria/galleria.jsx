'use client'

import {
    useScroll,
    useVelocity,
    useSpring,
    useAnimationFrame,
} from "framer-motion"
import { useRef } from "react"
import { videos } from "../../utils/datos"
import {TextoEscritura} from "../home/componentes/TextoEscritura"


function Fila({ items, velocidadBase = 15, direccion = "derecha" }) {
    const posicionX = useRef(0)
    const contenedorRef = useRef(null)

    const { scrollY } = useScroll()
    const velocidadScroll = useVelocity(scrollY)

    const velocidadSuavizada = useSpring(velocidadScroll, {
        damping: 60,
        stiffness: 300,
    })

    const vaIzquierda = direccion === "izquierda"

    useAnimationFrame((_, delta) => {
        let movimiento = velocidadBase * (delta / 1000)
        const factorScroll = velocidadSuavizada.get() * 0.002

        movimiento += factorScroll
        posicionX.current += vaIzquierda ? -movimiento : movimiento
        if (posicionX.current < -50) posicionX.current = 0
        if (posicionX.current > 0) posicionX.current = -50

        if (contenedorRef.current) {
            contenedorRef.current.style.transform = `translateX(${posicionX.current}%)`
        }
    })

    return (
        <div className="overflow-hidden py-3">
            <div ref={contenedorRef} className="flex gap-5 w-max">
                {[...items, ...items].map((item, i) => (
                    <div
                        key={i}
                        className="w-[270px] h-[260px] rounded-xl overflow-hidden flex-shrink-0"
                    >
                        <video
                            src={item.url}
                            autoPlay
                            muted
                            loop
                            playsInline
                            className="w-full h-full object-cover"
                        />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default function Galleria() {
    return (
        <div className="w-full h-screen  flex flex-col">

            <div className="h-[10%] w-full flex items-start mt-10 ml-7">
                <TextoEscritura inicio={1000} className="text-white text-[28px] lg:text-6xl md:text-[39px]" text="Grabamos tus mejores momentos" />
            </div>

            <div className="h-[90%] flex flex-col justify-center">
                <Fila items={videos.slice(0, 12)} velocidadBase={1.2} direccion="derecha" />
                <Fila items={videos.slice(12, 24)} velocidadBase={1.4} direccion="izquierda" />
                <Fila items={videos.slice(24, 36)} velocidadBase={1.3} direccion="derecha" />
                <Fila items={videos.slice(36, 48)} velocidadBase={1.5} direccion="izquierda" />
                <Fila items={videos.slice(48, 50)} velocidadBase={1} direccion="derecha" />
            </div>

        </div>
    )
}