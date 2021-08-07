import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/heart/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.308522}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked1.geometry}
          position={[-0.009945, -0.086468, -0.257009]}
          rotation={[0.549713, 0, 0]}
          scale={23.660522}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/heart/Tongues/forked.glb')
