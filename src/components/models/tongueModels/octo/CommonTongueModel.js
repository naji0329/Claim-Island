import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/octo/Tongues/common.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.oc_tong.geometry}
          position={[0, 0, -0.01]}
          rotation={[-0.053387, 0.00109, 0.004532]}
          scale={0.375189}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/octo/Tongues/common.glb')
