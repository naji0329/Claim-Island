import { memo, useMemo, useEffect } from "react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";
import { useThree } from "@react-three/fiber";

export const ReflectionPlate = memo(() => {
  const geometry = useMemo(() => new THREE.PlaneGeometry( 20, 20 ), []);
  const groundMirror = useMemo(() => new Reflector( geometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x7b9eba,
  } ), []);
  const { scene } = useThree();
  console.log(scene);
  useEffect(() => {
    groundMirror.position.y = -0.0005;
    groundMirror.rotateX( - Math.PI / 2 );
    scene.add( groundMirror );
  }, []);

  return null;
});
