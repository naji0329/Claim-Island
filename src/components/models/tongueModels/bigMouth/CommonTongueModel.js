import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/bigmouth/Tongues/common.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.695856}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cbm_tong.geometry}
          position={[0.001201, -0.002556, -0.006379]}
          rotation={[-0.24734, 0, 0]}
          scale={0.158025}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cbm_tong.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
