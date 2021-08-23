import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/threelipped/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group
        position={[-0.004353, -0.00009, -0.007789]}
        rotation={[-0.868151, 0.171459, -2.942771]}
        scale={1.778416}
      >
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked4.geometry}
          position={[0.003499, -0.002939, -0.006437]}
          rotation={[1.467179, 0, -Math.PI]}
          scale={0.518769}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked4.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}

useGLTF.preload("/clam-models/threelipped/Tongues/forked.glb");
