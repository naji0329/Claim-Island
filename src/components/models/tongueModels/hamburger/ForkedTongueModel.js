import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/hamburger/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked8.geometry}
          position={[-0.006095, 0.006647, 0.048918]}
          rotation={[0.358352, 0, 0]}
          scale={14.523055}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/hamburger/Tongues/forked.glb')
