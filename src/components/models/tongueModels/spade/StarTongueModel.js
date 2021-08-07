import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/spade/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_star3.geometry}
          position={[0.175669, -0.014979, -0.186524]}
          rotation={[-0.006908, -0.312359, 0.05288]}
          scale={0.517199}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/spade/Tongues/star.glb')
