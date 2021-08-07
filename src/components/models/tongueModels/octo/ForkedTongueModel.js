import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/octo/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked3.geometry}
          position={[-0.006169, -0.006165, -0.059894]}
          rotation={[0.549713, 0, 0]}
          scale={7.299798}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/octo/Tongues/forked.glb')
