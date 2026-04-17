
import { useRef } from 'react'
import './App.css'
import {  useScroll,  } from 'framer-motion'
import { ParallaxSeccion } from './componentes/ParallaxSeccion'
import Home from './screens/home/home'
import About from './screens/about/about'
import Galleria from './screens/Galleria/galleria'
import Nosotros from './screens/nosotros/page'


  const sections = [
  {
    bg: 'bg-slate-900',   
    children: <Home />,
  },
  {
    bg: 'bg-black',
    children: <About />,
  },
  {
    bg: "bg-black",
    children: <Galleria />
  },
  {
    bg: "bg-black",
    children: <Nosotros />
  }

]



function App() {
   const contenidoRef = useRef(null)
   const {scrollY} = useScroll({container: contenidoRef})


  return (
    <div
    ref={contenidoRef}
    className='h-screen overflow-y-scroll snap-y snap-mandatory'>
        {sections.map((section, i) => (
          <ParallaxSeccion
          key={i}
          index={i}
          bg={section.bg}
          scrollY={scrollY} >
            {section.children}
          </ParallaxSeccion>
        ))}
    </div>
  )
}

export default App
