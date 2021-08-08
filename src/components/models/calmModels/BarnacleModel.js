import React, { useRef } from 'react';
import { useGLTF } from '@react-three/drei';

export function BarnacleModel(props) {
  const group = useRef();
  const { nodes } = useGLTF('/clam-models/barnacle/clam.glb');
  const { outerTexture, innerTexture, lipTexture, ...rest } = props;

  return (
      <group ref={group} {...rest}>
          <group scale={1.955912}>
              <mesh castShadow receiveShadow geometry={nodes.cb_top2_1.geometry}>
                <meshStandardMaterial attach="material">
                  <canvasTexture attach="map" args={[innerTexture]} />
                </meshStandardMaterial>
              </mesh>
              <mesh castShadow receiveShadow geometry={nodes.cb_top2_2.geometry}>
                <meshStandardMaterial attach="material">
                  <canvasTexture attach="map" args={[outerTexture]} />
                </meshStandardMaterial>
              </mesh>
              <mesh castShadow receiveShadow geometry={nodes.cb_top2_3.geometry} material={nodes.cb_top2_3.material}>
                <meshStandardMaterial attach="material">
                  <canvasTexture attach="map" args={[lipTexture]} />
                </meshStandardMaterial>
              </mesh>
              <mesh castShadow receiveShadow geometry={nodes.cb_top3_1.geometry} material={nodes.cb_top3_1.material}>
                <meshStandardMaterial attach="material">
                  <canvasTexture attach="map" args={[innerTexture]} />
                </meshStandardMaterial>
              </mesh>
              <mesh castShadow receiveShadow geometry={nodes.cb_top3_2.geometry}>
                <meshStandardMaterial attach="material">
                  <canvasTexture attach="map" args={[outerTexture]} />
                </meshStandardMaterial>
              </mesh>
              <mesh castShadow receiveShadow geometry={nodes.cb_top3_3.geometry}>
                <meshStandardMaterial attach="material">
                  <canvasTexture attach="map" args={[lipTexture]} />
                </meshStandardMaterial>
              </mesh>
          </group>
      </group>
  );
}

export default BarnacleModel;
