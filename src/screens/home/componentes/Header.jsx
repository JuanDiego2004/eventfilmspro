import { useEffect, useState } from "react";
import TextoAnimado from "./TextoAnimado";

export default function Header() {
  const [mostrarTexto, setMostrarTexto] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setMostrarTexto(true);
    }, 7000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full h-20 z-50">
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md border-b border-white/10" />

      <div className="relative h-full flex items-center justify-between px-10">
        {mostrarTexto && (
          <TextoAnimado
            text="Event Films Pro"
            className="text-white text-[19px] font-bold tracking-wider font-spacex"
          />
        )}

        <nav className="flex gap-8 text-gray-300">
          <a href="#" className="hover:text-white transition">Inicio</a>
          <a href="#" className="hover:text-white transition">Servicios</a>
          <a href="#" className="hover:text-white transition">Proyectos</a>
          <a href="#" className="hover:text-white transition">Contacto</a>
        </nav>
      </div>
    </header>
  );
}