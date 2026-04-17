import { Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import GlitchOverlay from "./componentes/GlitchOverlay";
import { Planeta } from "../../componentes/modelos/Planet";
import { Canvas } from "@react-three/fiber";
import { Environment, OrbitControls } from "@react-three/drei";
import Header from "./componentes/Header";
import { TextoEscritura } from "./componentes/TextoEscritura";
import { ParpadeoElectrico } from "./componentes/ElectricoFramer";

export default function Home() {
  const [mostrar, setMostrar] = useState(false);
  const [empezarSalida, setEmpezarSalida] = useState(false);
  const [activarTexto, setActivarTexto] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setMostrar(true), 3000);
    const t2 = setTimeout(() => setEmpezarSalida(true), 6000);
    const t3 = setTimeout(() => {
      setMostrar(false);
      setEmpezarSalida(false);
      setActivarTexto(true);
    }, 7000);

    return () => [t1, t2, t3].forEach(clearTimeout);
  }, []);

  return (
    <div className="w-full h-screen bg-black relative overflow-hidden">

      <Header />

      <div className="relative z-10 flex flex-col md:flex-row h-full pt-20">
        <div className="w-full md:w-[40%]  flex items-center justify-center ">
          <div className="rounded-2xl w-[90%] p-10 shadow-2xl  text-center md:text-left">

            <TextoEscritura
              inicio={7000}
              className="md:text-[47px] text-white font-sans"
              text="Producción audiovisual que convierte ideas en impacto"
            />

            <ParpadeoElectrico inicio={8000} duracionActiva={3000} intervalo={60}>
              <h1 className="md:text-[24px] text-gray-400 font-mono">
                Videos para marcas, eventos y contenido digital
              </h1>
            </ParpadeoElectrico>

            <ParpadeoElectrico className="mt-9" inicio={8000} duracionActiva={3000} intervalo={60}>
              <button className="w-[140px] h-[40px] bg-white rounded-md">
                VER PROYECTOS
              </button>
            </ParpadeoElectrico>

          </div>
        </div>

        <div className="w-full md:w-[60%] h-[50vh] md:h-full order-1 md:order-2">
          <Canvas camera={{ position: [0, 0, 5] }}>
            <Suspense fallback={null}>
              <Environment preset="city" />
              <Planeta position={[4, 0, 0]} scale={2.2} />
            </Suspense>
            <ambientLight intensity={1} />
            <directionalLight position={[5, 5, 5]} intensity={3} />
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>

      </div>

      <div className="fixed inset-0 z-[999] pointer-events-none">
        <GlitchOverlay show={mostrar} isExiting={empezarSalida} />
      </div>

    </div>
  );
}