import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/bigmouth/Tongues/spiral.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.695856}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.t_spiral5.geometry}
          position={[-0.012131, -0.025479, -0.073427]}
          rotation={[-0.368863, 0, 0]}
          scale={0.352032}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.t_spiral5.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
