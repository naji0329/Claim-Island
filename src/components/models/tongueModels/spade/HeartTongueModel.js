import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/spade/Tongues/heart.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_t_heart3.geometry}
          position={[0.178965, -0.00251, -0.214319]}
          rotation={[-1.715389, 1.54599, 1.810262]}
          scale={0.99367}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/spade/Tongues/heart.glb')
