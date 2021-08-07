import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/maxima/Tongues/star.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star2.geometry}
          position={[0.001542, -0.034094, -0.023113]}
          rotation={[-0.000284, -0.26349, 0.103556]}
          scale={0.468137}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/maxima/Tongues/star.glb')
