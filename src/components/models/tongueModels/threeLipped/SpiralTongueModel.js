import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/threelipped/Tongues/spiral.glb");
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
          geometry={nodes.t_spiral4.geometry}
          position={[0.011246, -0.031405, -0.038293]}
          rotation={[-0.558211, -0.251129, -3.06682]}
          scale={0.305411}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral4.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
