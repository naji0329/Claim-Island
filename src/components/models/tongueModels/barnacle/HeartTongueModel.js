import React, { useRef } from "react";
import { useGLTF, useTexture } from "@react-three/drei";

export default function Model(props) {
  const group = useRef();
  const { nodes } = useGLTF("/clam-models/barnacle/Tongues/heart.glb");
  const materialProps = useTexture({ normalMap: "/clam-models/tongue-normal.png" });
  const { tongueTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group scale={1.955912}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.cc_t_heart7.geometry}
          position={[-0.001769, -0.002995, -0.028571]}
          rotation={[3.070838, -1.483857, -0.046278]}
          scale={0.790926}
        >
          <meshStandardMaterial
            attach="material"
            {...nodes.cc_t_heart7.material}
            {...materialProps}
            map={tongueTexture}
          />
        </mesh>
      </group>
    </group>
  );
}
