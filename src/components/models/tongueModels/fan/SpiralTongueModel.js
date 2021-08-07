import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/fan/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_spiral4.geometry}
          position={[0.017777, -0.224671, -0.576121]}
          rotation={[-0.253673, 0, 0]}
          scale={3.107498}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/fan/Tongues/spiral.glb')
