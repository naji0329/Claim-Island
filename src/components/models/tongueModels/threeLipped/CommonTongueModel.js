import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/threelipped/Tongues/common.glb");
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
          geometry={nodes.c3_tong.geometry}
          position={[0, 0.000269, 0.000046]}
          rotation={[0.040947, 0, 0]}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.c3_tong.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
