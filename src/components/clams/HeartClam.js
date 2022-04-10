import { useState, useEffect } from "react";

import { loadGLTFPromise } from "components/three/loaders/gltf_loader";
import { HeartModel } from "../models/calmModels/HeartModel";
import CommonTongueModel from "../models/tongueModels/heart/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/heart/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/heart/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/heart/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/heart/StarTongueModel";
import { TONGUE_TYPES, CLAM_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const HeartClam = (props) => {
  const { tongueType, textures, clamType } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  const [valentine, setValentine] = useState(null);

  useEffect(() => {
    if (clamType === CLAM_TYPES.valentine) {
      const init = async () => {
        const { scene } = await loadGLTFPromise("/clam-models/heart/roses_opt.glb");
        setValentine(scene);
      };
      init();
    }
  }, [clamType]);

  return (
    <group position={[0, 0, -0.01]}>
      {valentine && <primitive object={valentine} dispose={null} />}
      <HeartModel outerTexture={outerTexture} innerTexture={innerTexture} lipTexture={lipTexture} />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
