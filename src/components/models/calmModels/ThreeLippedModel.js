import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function ThreeLippedModel(props) {
  const group = useRef();
  const { nodes } = useGLTF('/clam-models/threelipped/clam.glb');
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
    <group ref={group} {...rest}>
      <group position={[-0.004353, -0.00009, -0.007789]} rotation={[-0.868151, 0.171459, -2.942771]} scale={1.778416}>
        <group position={[0, 0.013618, 0.003292]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_1.geometry} material={nodes.c3_top_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_2.geometry} material={nodes.c3_top_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_top_3.geometry} material={nodes.c3_top_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]}/>
            </meshStandardMaterial>
          </mesh>
        </group>
        <group position={[0, 0.013618, 0.003292]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_1.geometry} material={nodes.c3_bttm_1.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[innerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_2.geometry} material={nodes.c3_bttm_2.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[outerTexture]}/>
            </meshStandardMaterial>
          </mesh>
          <mesh castShadow receiveShadow geometry={nodes.c3_bttm_3.geometry} material={nodes.c3_bttm_3.material}>
            <meshStandardMaterial attach="material">
              <canvasTexture attach="map" args={[lipTexture]}/>
            </meshStandardMaterial>
          </mesh>
        </group>
      </group>
    </group>
  );
}

export default ThreeLippedModel;

useGLTF.preload('/clam-models/threelipped/clam.glb');
