import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/common/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[0, 0, -0.01]} scale={0.281405}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart.geometry}
          position={[-0.022435, -0.062911, -0.114657]}
          rotation={[1.787917, 1.415384, -1.672362]}
          scale={4.492414}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
