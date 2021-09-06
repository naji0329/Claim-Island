import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/maxima/Tongues/star.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.283419}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_star2.geometry}
          position={[0.001542, -0.034094, -0.023113]}
          rotation={[-0.000284, -0.26349, 0.103556]}
          scale={0.468137}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_star2.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
