import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/heart/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.308522}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star1.geometry}
          position={[-0.047476, -0.145199, -0.146764]}
          rotation={[0.207383, -0.342121, 0.033449]}
          scale={2.206147}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/heart/Tongues/star.glb')
