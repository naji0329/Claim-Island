import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/maxima/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cm_t_common.geometry}
          position={[0, -0.016547, -0.062335]}
          scale={4.85183}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cm_t_common.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
