import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Text } from "@react-three/drei";
import * as THREE from "three";

import { ClamBackground } from "./ClamBackground";

export const ClamScene = ({ children }) => {
  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: 1,
        near: 0.1,
        far: 1000,
        position: [-0.4, 0.9, -1.4],
        zoom: 7,
      }}
      shadows
      raycaster={{enabled: true}}
      pixelRatio={window.devicePixelRatio}
      onCreated={canvasCtx => {
        canvasCtx.gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <Suspense fallback={<Text>LOADING</Text>}>
        {children}
        <ClamBackground />
      </Suspense>
      <spotLight
        args={[0xffffff, 0.74, 28.08, 0.214, 0, 1]}
        position={[-0.5, 1.125, 1.428]}
        castShadow
      />
      <hemisphereLight args={[0x8d8d91, 0, 2.4]} position={[0, 10, 0]} />
      <OrbitControls
        enableZoom={false}
        autoRotate={true}
        autoRotateSpeed={3}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        target={[0,0.04,-0.1]}
      />
    </Canvas>
  )
};
