'use client'

import { useEffect, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import { Center, Environment, OrbitControls } from "@react-three/drei";
import { useInView } from "framer-motion";

import { TextoEscritura } from "../home/componentes/TextoEscritura";
import { ParpadeoElectrico } from "../home/componentes/ElectricoFramer";
import { ADN } from "../../componentes/modelos/Dna_hologram";

const datos = [
  {
    titulo: "Nuestra Visión",
    texto:
      "Ser la productora audiovisual de referencia en Latinoamérica, transformando cada historia en una experiencia cinematográfica que trasciende el tiempo.",
  },
  {
    titulo: "Nuestra Misión",
    texto:
      "Materializar ideas creativas con tecnología de vanguardia, entregando contenido visual que conecta emocionalmente con las audiencias.",
  },
  {
    titulo: "Quiénes Somos",
    texto:
      "Un equipo apasionado de cineastas, diseñadores y creativos que fusionan arte y tecnología para producir contenido que deja huella.",
  },
];

function usarBreakpoint() {
  const [bp, setBp] = useState("escritorio");

  useEffect(() => {
    function actualizar() {
      const w = window.innerWidth;
      if (w >= 1440) setBp("escritorio");
      else if (w >= 1024) setBp("laptop");
      else setBp("movil");
    }

    actualizar();
    window.addEventListener("resize", actualizar);
    return () => window.removeEventListener("resize", actualizar);
  }, []);

  return bp;
}

export default function Nosotros() {
  const seccionRef = useRef(null);
  const bp = usarBreakpoint();

  return (
    <div ref={seccionRef} className="w-full h-screen bg-black relative overflow-hidden">

      <div className="absolute inset-0 flex items-center justify-center z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <Suspense fallback={null}>
            <Center>
              <ADN
                scale={
                  bp === "escritorio"
                    ? 5
                    : bp === "laptop"
                      ? 3
                      : 1
                }
              />
            </Center>

            <Environment preset="city" />
          </Suspense>

          <ambientLight intensity={1} />
          <directionalLight position={[5, 5, 5]} intensity={2} />
          <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
        </Canvas>
      </div>

      {(bp === "escritorio" || bp === "laptop") && (
        <div className="relative z-10 h-full w-full flex flex-row p-10 gap-6">

          <div className="w-[100%] flex flex-col justify-between">

            <div className="w-[65%]">
              <div className="flex flex-col gap-3">
                <TextoEscritura
                  className="text-[42px] text-white"
                  inicio={300}
                  text="La creatividad corre por nuestro ADN"
                />

                <ParpadeoElectrico inicio={1000} duracionActiva={3000} intervalo={60}>
                  <p className="text-gray-400 font-mono text-sm tracking-widest md:text-[19px]">
                    Cada frame, cada historia, cada proyecto nos define
                  </p>
                </ParpadeoElectrico>
              </div>
            </div>

            <div className="flex flex-row gap-5 ">
              {datos.map((d) => (
                <div key={d.titulo} className="border-l-2 pl-4">

                  <ParpadeoElectrico className="mt-9" inicio={1300} duracionActiva={3000} intervalo={60}>
                    <h3 className="text-white text-xs md:text-[16px] uppercase tracking-widest font-semibold mb-1">
                      {d.titulo}
                    </h3>
                    <p className="text-white/70 md:text-[15px] leading-relaxed">
                      {d.texto}
                    </p>
                  </ParpadeoElectrico>

                </div>
              ))}
            </div>

          </div>

          <div className="flex-1" />

        </div>
      )}

      {bp === "movil" && (
        <div className="relative z-10 h-full flex flex-col overflow-y-auto">

          <div className="h-[40vh]" />

          <div className="flex flex-col gap-5 p-6">

            <div className="flex flex-col gap-2">
              <TextoEscritura
                className="text-[28px] text-white"
                inicio={300}
                text="La creatividad corre por nuestro ADN"
              />

              <ParpadeoElectrico inicio={1000} duracionActiva={3000} intervalo={60}>
                <p className="text-gray-400 font-mono text-xs tracking-widest">
                  Cada frame, cada historia, cada proyecto nos define
                </p>
              </ParpadeoElectrico>
            </div>

            <div className="flex flex-col gap-4 pb-10">
              {datos.map((d) => (
                <div key={d.titulo} className="border-l-2 border-orange-500 pl-3">
                  <h3 className="text-orange-400 text-xs uppercase tracking-widest font-semibold mb-1">
                    {d.titulo}
                  </h3>
                  <p className="text-white/70 text-sm leading-relaxed">
                    {d.texto}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}