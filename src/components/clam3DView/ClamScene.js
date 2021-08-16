import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";

import { ClamBackground } from "./ClamBackground";
import { Loading3DView } from "../Loading3DView";

export const ClamScene = ({ children }) => {
  return (
    <Canvas
      camera={{
        fov: 75,
        aspect: 1,
        near: 0.1,
        far: 1000,
        position: [-0.4, 0.9, -1.4],
        zoom: 9,
      }}
      shadows
      raycaster={{enabled: true}}
      pixelRatio={window.devicePixelRatio}
      onCreated={canvasCtx => {
        canvasCtx.gl.toneMapping = THREE.NoToneMapping;
      }}
    >
      <Suspense fallback={<Loading3DView />}>
        {children}
        <ClamBackground />
      </Suspense>
      <spotLight
        args={[0xffffff, 1.14, 28.08, 0.214, 0, 1]}
        position={[-2.154, 3.356156, -4.200072]}
      />
      <spotLight
        args={[0xffffff, 1.04, 28.08, 0.214, 0, 1]}
        position={[1.5, 1.125, 1.428]}
        castShadow
      />
      <hemisphereLight args={[0x8d8d91, 0, 2.4]} position={[0, 10, 0]} />
    </Canvas>
  )
};
