import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/fan/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_star4.geometry}
          position={[-0.064004, -0.205592, -0.202849]}
          rotation={[-0.006908, -0.312359, -0.002505]}
          scale={3.514893}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/fan/Tongues/star.glb')
