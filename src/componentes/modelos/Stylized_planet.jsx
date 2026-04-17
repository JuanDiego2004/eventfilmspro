import React, { useEffect, useRef } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'

export function PlanetaAbstracto({isVisible, ...props}) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF('/modelos/stylized_planet.glb')
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    if (actions) {
      Object.values(actions).forEach((action) => {
        action.reset().play()
        action.timeScale = 0.3
      })
    }
  }, [actions])

  useEffect(() => {
    if (isVisible && group.current) {
      group.current.scale.set(0, 0, 0)
    }
  }, [isVisible])

  useFrame(() => {
    if (!group.current) return
    const target = props.scale ?? 0.8
    group.current.scale.lerp({ x: target, y: target, z: target }, 0.01) 
  })

  return (
    <group ref={group} {...props} scale={0} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-1.54, -0.064, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Clouds_1">
                <mesh name="Object_4" geometry={nodes.Object_4.geometry} material={materials.Clouds} />
              </group>
              <group name="Planet_2">
                <mesh name="Object_6" geometry={nodes.Object_6.geometry} material={materials.Planet} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/stylized_planet.glb')