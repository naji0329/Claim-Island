import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/spade/Tongues/spiral.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.225128, -0.001867, 0.221955]} scale={1.217426}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cs_spiral3.geometry}
          position={[0.174425, -0.020633, -0.267087]}
          rotation={[-0.253673, 0, 0]}
          scale={0.502635}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/spade/Tongues/spiral.glb')
