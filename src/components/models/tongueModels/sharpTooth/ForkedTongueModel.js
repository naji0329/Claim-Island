import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/sharptooth/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked6.geometry}
          position={[0.001045, -0.025714, -0.038268]}
          rotation={[0.549713, 0, 0]}
          scale={4.778253}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/sharptooth/Tongues/forked.glb')
