import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/octo/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral3.geometry}
          position={[-0.008477, -0.036431, -0.127956]}
          rotation={[-0.283355, 0, 0]}
          scale={0.688651}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/octo/Tongues/spiral.glb')
