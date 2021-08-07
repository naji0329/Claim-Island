import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/fan/Tongues/common.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.192474}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cf_tongue.geometry}
          position={[0.038203, -0.06419, -0.012541]}
          rotation={[-0.000971, 0.033837, 0.028707]}
          scale={1.846701}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/fan/Tongues/common.glb')
