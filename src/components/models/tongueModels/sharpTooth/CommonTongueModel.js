import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/sharptooth/Tongues/common.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.43273}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.ct_tong.geometry}
          position={[0.001201, -0.020693, -0.006379]}
          rotation={[-0.150404, -0.01463, 0.030361]}
          scale={0.223008}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/sharptooth/Tongues/common.glb')
