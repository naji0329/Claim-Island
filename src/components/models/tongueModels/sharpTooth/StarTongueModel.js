import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/sharptooth/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star6.geometry}
          position={[-0.007642, -0.039779, -0.021379]}
          rotation={[0.060595, -0.308371, 0.020875]}
          scale={0.456833}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/sharptooth/Tongues/star.glb')
