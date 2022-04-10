import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/octo/Tongues/forked.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={0.863168}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_forked3.geometry}
          position={[-0.006169, -0.006165, -0.059894]}
          rotation={[0.549713, 0, 0]}
          scale={7.299798}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_forked3.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
