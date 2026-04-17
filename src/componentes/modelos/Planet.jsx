import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function Planeta(props) {
  const { nodes, materials } = useGLTF('/modelos/planet.glb')
  const pivot = useRef()

  useFrame((state, delta) => {
    if (pivot.current) {
      pivot.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={pivot} {...props} dispose={null}>
      <group  position={[0, 0, 0]} // 👈 centrado
      rotation={[-Math.PI / 2, 0, 0]}
      scale={2}>
        <mesh geometry={nodes.COMBINE_LP_LAM_0.geometry} material={materials.material} />
        <mesh geometry={nodes.COMBINE_LP_1_0.geometry} material={materials.material_1} />
        <mesh geometry={nodes.COMBINE_LP_2_0.geometry} material={materials.material_2} />
      </group>
    </group>
  )
}

useGLTF.preload('/modelos/planet.glb')