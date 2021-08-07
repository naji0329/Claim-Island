import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/heart/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.308522}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral1.geometry}
          position={[-0.028314, -0.107362, -0.415121]}
          scale={2.154907}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/heart/Tongues/spiral.glb')

