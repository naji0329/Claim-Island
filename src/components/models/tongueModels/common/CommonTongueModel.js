import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/common/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[0, 0, -0.01]} scale={0.281405}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_common.geometry}
          position={[0.004268, -0.009083, 0.012868]}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_common.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
