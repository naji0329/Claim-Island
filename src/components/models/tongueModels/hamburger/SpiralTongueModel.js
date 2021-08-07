import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/hamburger/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral.geometry}
          position={[-0.020872, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/hamburger/Tongues/spiral.glb')
