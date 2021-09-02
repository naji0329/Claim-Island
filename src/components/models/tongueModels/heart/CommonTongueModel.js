import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/heart/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.244673}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_common.geometry}
          position={[0.01065, 0, 0]}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_common.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
