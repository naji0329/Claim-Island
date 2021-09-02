import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/bigmouth/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.695856}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart5.geometry}
          position={[0.000571, -0.005455, -0.02808]}
          rotation={[-2.056718, 1.521328, 1.789009]}
          scale={0.726645}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart5.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
