import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/maxima/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked2.geometry}
          position={[-0.007736, -0.020599, -0.058283]}
          rotation={[0.549713, 0.247191, 0]}
          scale={3.815215}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/maxima/Tongues/forked.glb')
