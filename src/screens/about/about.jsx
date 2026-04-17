import { Canvas } from "@react-three/fiber";
import { Suspense, useEffect, useRef, useState } from "react";
import { PlanetaAbstracto } from "../../componentes/modelos/Stylized_planet";
import { Center, Environment } from "@react-three/drei";
import { useInView, motion } from "framer-motion";
import { TextoEscritura } from "../home/componentes/TextoEscritura";
import { ParpadeoElectrico } from "../home/componentes/ElectricoFramer";
import { servicios } from "../../utils/datos";
import { CardsLaptop } from "./componentes/CardsLaptop";
import CardsEscritorio from "./componentes/CardsEscritorio";
import CardServicio from "./componentes/Card";


const configPlaneta = {
  escritorio: {
    camera: [0, 0, 2],
    position: [0, -2.2, 0],
  },
  laptop: {
    camera: [0, 0, 2.5],
    position: [0, -2.29, 0],
  },
  movil: {
    camera: [0, 0, 3],
    position: [0, -3, 0],
  },
}

function usarEscalaPlaneta() {
  const [escala, setEscala] = useState(0.8)
  useEffect(() => {
    function actualizar() {
      const ancho = window.innerWidth
      if (ancho >= 1024 && ancho < 1440) setEscala(0.5)
      else if (ancho < 1024) setEscala(0.7)
      else setEscala(0.8)
    }
    actualizar()
    window.addEventListener("resize", actualizar)
    return () => window.removeEventListener("resize", actualizar)
  }, [])
  return escala
}

function usarBreakpoint() {
  const [bp, setBp] = useState("escritorio")
  useEffect(() => {
    function actualizar() {
      const ancho = window.innerWidth
      if (ancho >= 1440) setBp("escritorio")
      else if (ancho >= 1024) setBp("laptop")
      else setBp("movil")
    }
    actualizar()
    window.addEventListener("resize", actualizar)
    return () => window.removeEventListener("resize", actualizar)
  }, [])
  return bp
}

export default function About() {
  const seccionRef = useRef(null)
  const esVisible = useInView(seccionRef, { once: false, amount: 0.3 })
  const escala = usarEscalaPlaneta()
  const bp = usarBreakpoint()
  const config = configPlaneta[bp]

  return (
    <div ref={seccionRef} className="w-full h-screen relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        {/* <Canvas camera={{ position: [0, 0, 2], fov: 50, near: 0.1, far: 1000 }}>
          <Suspense fallback={null}>
            <Center>
              <PlanetaAbstracto isVisible={esVisible} position={config.position} scale={escala} />
            </Center>
            <Environment preset="city" />
          </Suspense>
        </Canvas> */}
      </div>

     {bp === "escritorio" && (
  <div className="relative z-10 h-full flex flex-row gap-8 p-8">

    <div className="flex flex-col justify-center items-start text-left w-[30%] gap-4">
      <TextoEscritura
        className="text-[48px] text-white"
        inicio={500}
        text="Capturamos y producimos contenido visual de alta calidad para marcas y eventos"
      />
      <ParpadeoElectrico inicio={1400} duracionActiva={3000} intervalo={60}>
        <h1 className="text-white font-bold text-sm tracking-widest">
          SISTEMA CREATIVO ACTIVO
        </h1>
      </ParpadeoElectrico>
    </div>

    <div className="flex-1 h-full py-8">
      <CardsEscritorio servicios={servicios} esVisible={esVisible} />
    </div>

  </div>
)}

      {bp === "laptop" && (
        <div className="relative z-10 h-full flex flex-col p-8 gap-6">
          <div className="flex flex-col items-start text-left max-w-lg gap-3">
            <TextoEscritura
              className="text-[20px] md:text-[40px] text-white"
              inicio={500}
              text="Materializamos tus ideas"
            />
            <ParpadeoElectrico inicio={1400} duracionActiva={3000} intervalo={60}>
              <h1 className="text-white font-bold text-xs tracking-widest">
                SISTEMA CREATIVO ACTIVO
              </h1>
            </ParpadeoElectrico>
          </div>

          <div className="flex-1 flex items-end">
            <CardsLaptop servicios={servicios} esVisible={esVisible} />
          </div>
        </div>
      )}

      {bp === "movil" && (
        <div className="relative z-10 h-full flex flex-col justify-center p-6 gap-4">
          <div className="flex flex-col items-start text-left gap-3">
            <TextoEscritura
              className="text-[24px] text-white"
              inicio={500}
              text="Materializamos tus ideas"
            />
            <ParpadeoElectrico inicio={1400} duracionActiva={3000} intervalo={60}>
              <h1 className="text-white font-bold text-xs tracking-widest">
                SISTEMA CREATIVO ACTIVO
              </h1>
            </ParpadeoElectrico>
          </div>

          <div className="flex flex-col gap-3 pb-6">
            {servicios.map((s, i) => (
              <CardServicio
                key={s.titulo}
                {...s}
                index={i}
                esVisible={esVisible}
                desdeIzquierda={i % 2 === 0}
              />
            ))}
          </div>
        </div>
      )}

    </div>
  )
}