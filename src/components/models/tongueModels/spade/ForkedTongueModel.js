import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/spade/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_forked3.geometry}
          position={[0.178574, -0.009134, -0.224384]}
          rotation={[0.610081, 0.006309, 0.00649]}
          scale={5.619899}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/spade/Tongues/forked.glb')
