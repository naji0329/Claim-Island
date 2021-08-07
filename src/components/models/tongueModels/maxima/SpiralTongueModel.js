import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/maxima/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral2.geometry}
          position={[-0.006743, -0.025817, -0.083647]}
          scale={0.323871}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/maxima/Tongues/spiral.glb')
