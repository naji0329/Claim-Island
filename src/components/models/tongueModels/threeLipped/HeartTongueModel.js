import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/threelipped/Tongues/heart.glb");
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
          geometry={nodes.cc_t_heart4.geometry}
          position={[-0.001004, -0.013527, -0.012925]}
          rotation={[2.291889, -1.428044, -0.007527]}
          scale={0.719824}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart4.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
