import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/sharptooth/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral6.geometry}
          position={[0.000557, -0.033485, -0.087165]}
          scale={0.406177}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/sharptooth/Tongues/spiral.glb')
