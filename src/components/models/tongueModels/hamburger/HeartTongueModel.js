import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/hamburger/Tongues/heart.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart8.geometry}
          position={[-0.008777, 0.003771, 0.120421]}
          rotation={[0.415498, 1.527166, -0.505647]}
          scale={2.834003}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/hamburger/Tongues/heart.glb')
