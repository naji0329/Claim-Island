import { useRef, useEffect } from 'react';
import { useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BarnacleClam } from './BarnacleClam';
import { BigmouthClam } from './BigMouthClam';
import { CommonClam } from './CommonClam';
import { FanClam } from './FanClam';
import { HamburgerClam } from './HamburgerClam';
import { HeartClam } from './HeartClam';
import { MaximaClam } from './MaximaClam';
import { OctoClam } from './OctoClam';
import { SharpToothClam } from './SharpToothClam';
import { SpadeClam } from './SpadeClam';
import { ThreeLippedClam } from './ThreeLippedClam';

import { CLAM_TYPES } from '../../constants/clams';

const CLAM_COMPONENTS = {
  [CLAM_TYPES.barnacle]: BarnacleClam,
  [CLAM_TYPES.bigmouth]: BigmouthClam,
  [CLAM_TYPES.common]: CommonClam,
  [CLAM_TYPES.fan]: FanClam,
  [CLAM_TYPES.hamburger]: HamburgerClam,
  [CLAM_TYPES.heart]: HeartClam,
  [CLAM_TYPES.maxima]: MaximaClam,
  [CLAM_TYPES.octo]: OctoClam,
  [CLAM_TYPES.sharptooth]: SharpToothClam,
  [CLAM_TYPES.spade]: SpadeClam,
  [CLAM_TYPES.threelipped]: ThreeLippedClam,
};

const DefaultClam = () => null;

export const Clam = (props) => {
  const {
    clamType,
    tongueType,
    textures,
    canvasCtx,
    clamDna
  } = props;

  const ClamComponent = CLAM_COMPONENTS[clamType] || DefaultClam;
  const groupMesh = useRef();
  useEffect(() => {
    return () => {
      textures.forEach((texture) => {texture.dispose()});
    }
  }, [])

  const renderImg = (canvasCtx) => {
    const clamImg = localStorage.getItem(clamDna);
    if(!clamImg && canvasCtx) {
      const img = canvasCtx.gl.domElement.toDataURL();
      localStorage.setItem(
        props.clamDna,
        img
      );
    }   
  };

  useFrame((state, delta) => {
    renderImg(canvasCtx);
    if (groupMesh.current) {
      groupMesh.current.rotation.y += (Math.PI * 2) * 0.001
    }
  });

  return (
    <>
      <group ref={groupMesh} position={[0, -0.02, -0.05]}>
        <group position={[0, 0, 0.1]}>
          <ClamComponent
            tongueType={tongueType}
            textures={textures} />
        </group>
      </group>
      <OrbitControls
        enableZoom={true}
        autoRotate={true}
        autoRotateSpeed={3}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        //minAzimuthAngle={Math.PI}
        //maxAzimuthAngle={Math.PI}
        maxDistance={3}
        minDistance={0.7}
        target={[0,0,-0.05]}
        enablePan={false}
        enableRotate={true}
      />
  </>
  );
};
