import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function Model(props) {
  const group = useRef()
  const { nodes } = useGLTF('/clam-models/threelipped/Tongues/forked.glb')
  return (
    <group ref={group} {...props} dispose={null}>
      <group position={[-0.004353, -0.00009, -0.007789]} rotation={[-0.868151, 0.171459, -2.942771]} scale={1.778416}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked4.geometry}
          position={[0.003499, -0.002939, -0.006437]}
          rotation={[1.467179, 0, -Math.PI]}
          scale={0.518769}
        />
      </group>
    </group>
  )
}

useGLTF.preload('/clam-models/threelipped/Tongues/forked.glb')
