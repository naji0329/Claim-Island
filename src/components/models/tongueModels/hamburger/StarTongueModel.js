import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/hamburger/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.000004, -0.002924, -0.093903]} scale={0.441361}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star8.geometry}
          position={[-0.025755, -0.040517, 0.108903]}
          rotation={[0.032696, -0.341159, 0.072429]}
          scale={1.319477}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/hamburger/Tongues/star.glb')
