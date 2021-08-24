import { useRef, useEffect } from 'react';
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { BarnacleClam } from "./BarnacleClam";
import { BigmouthClam } from "./BigMouthClam";
import { CommonClam } from "./CommonClam";
import { FanClam } from "./FanClam";
import { HamburgerClam } from "./HamburgerClam";
import { HeartClam } from "./HeartClam";
import { MaximaClam } from "./MaximaClam";
import { OctoClam } from "./OctoClam";
import { SharpToothClam } from "./SharpToothClam";
import { SpadeClam } from "./SpadeClam";
import { ThreeLippedClam } from "./ThreeLippedClam";

import { CLAM_TYPES } from "../../constants/clams";

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
    clamDna
  } = props;

  const ClamComponent = CLAM_COMPONENTS[clamType] || DefaultClam;
  const groupMesh = useRef();
  const { gl: canvasGl } = useThree();

  useEffect(() => {
    return () => {
      textures.forEach((texture) => {texture.dispose()});
      renderImg();
    }
  }, []);

  // check if cache api image exists
  const checkImgExists = async () => {
    const response = await cache.match(clamDna);
    if(response) {
      let clamImg = await response.json();
      clamImg = clamImg ? clamImg.img : clamImg;
      return clamImg ? true : false;
    } else {
      return false;
    }
  };

  const renderImg = async () => {
    const img = canvasGl.domElement.toDataURL();
    const cache = await caches.open('clam-island');
    let imgExists = false;
    // imgExists = await checkImgExists();

    if(!imgExists) {
      cache.put(clamDna, new Response(
        JSON.stringify({ img })
      ));
    }
  };

  useFrame((state, delta) => {
    if (groupMesh.current) {
      groupMesh.current.rotation.y += Math.PI * 2 * 0.001;
    }
  });

  return (
    <>
      <group ref={groupMesh} position={[0, -0.02, -0.05]}>
        <group position={[0, 0, 0.1]}>
          <ClamComponent tongueType={tongueType} textures={textures} />
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
        target={[0, 0, -0.05]}
        enablePan={false}
        enableRotate={true}
      />
    </>
  );
};
