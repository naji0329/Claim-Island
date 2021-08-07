import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/spade/Tongues/common.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh castShadow receiveShadow geometry={nodes.cs_tongue.geometry} material={materials.Tongues} />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/spade/Tongues/common.glb')
