import { useRef, useEffect, useState } from "react";
import { useThree } from "@react-three/fiber";
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

import { CLAM_TYPES } from "../../constants/ui/clams";

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
  const { clamType, tongueType, textures, clamDna, size = 100 } = props;

  const ClamComponent = CLAM_COMPONENTS[clamType] || DefaultClam;
  const groupMesh = useRef();
  const { gl: canvasGl } = useThree();
  const [rotate, startRotation] = useState(false);
  const scaleFactor = (size / 100) * 0.5 + 0.5;

  useEffect(() => {
    renderImg();
    return () => {
      if (textures) {
        textures.forEach((texture) => {
          texture.dispose();
        });
      }
    };
  }, []);

  // check if cache api image exists
  const checkImgExists = async (cache) => {
    const response = await cache.match(`/clams/${clamDna}`);
    if (response) {
      let clamImg = await response.json();
      clamImg = clamImg ? clamImg.img : clamImg;
      return clamImg ? true : false;
    } else {
      return false;
    }
  };

  const renderImg = async () => {
    const cache = await caches.open("clam-island");
    let imgExists = await checkImgExists(cache);

    if (!imgExists) {
      /** Need some time to render clam on scene */
      setTimeout(() => {
        const img = canvasGl.domElement.toDataURL();
        cache.put(`/clams/${clamDna}`, new Response(JSON.stringify({ img })));
        startRotation(true);
      }, 100);
    } else {
      startRotation(true);
    }
  };

  return (
    <>
      <group ref={groupMesh} position={[0, -0.02, -0.05]} scale={scaleFactor}>
        <group position={[0, 0, 0.1]}>
          <ClamComponent tongueType={tongueType} textures={textures} />
        </group>
      </group>
      <OrbitControls
        enableZoom={true}
        autoRotate={rotate}
        autoRotateSpeed={3}
        minPolarAngle={0}
        maxPolarAngle={Math.PI}
        maxDistance={3}
        minDistance={0.7}
        target={[0, 0, -0.05]}
        enablePan={false}
        enableRotate={true}
      />
    </>
  );
};
