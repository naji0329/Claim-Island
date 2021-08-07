import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/maxima/Tongues/heart.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart2.geometry}
          position={[-0.003471, -0.018622, -0.031485]}
          rotation={[0.492103, 1.43316, -0.677168]}
          scale={0.853932}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/maxima/Tongues/heart.glb')
