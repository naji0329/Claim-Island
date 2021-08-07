import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/threelipped/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.004353, -0.00009, -0.007789]} rotation={[-0.868151, 0.171459, -2.942771]} scale={1.778416}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star4.geometry}
          position={[-0.017276, -0.042321, -0.051547]}
          rotation={[2.250627, -0.598223, 0.051721]}
          scale={0.409115}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/threelipped/Tongues/star.glb')
