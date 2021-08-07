import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/fan/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_forked4.geometry}
          position={[-0.007061, -0.154734, -0.385073]}
          rotation={[0.402456, 0.004836, 0.007651]}
          scale={36.896427}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/fan/Tongues/forked.glb')
