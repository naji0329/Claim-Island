import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/heart/Tongues/common.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.244673}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_common.geometry}
          position={[0.01065, 0, 0]}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/heart/Tongues/common.glb')
