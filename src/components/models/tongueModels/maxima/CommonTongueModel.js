import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/maxima/Tongues/common.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cm_t_common.geometry}
          position={[0, -0.016547, -0.062335]}
          scale={4.85183}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/maxima/Tongues/common.glb')
