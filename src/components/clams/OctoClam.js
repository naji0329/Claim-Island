import { OctoModel } from "../models/calmModels/OctoModel";
import CommonTongueModel from "../models/tongueModels/octo/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/octo/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/octo/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/octo/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/octo/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const OctoClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <>
      <OctoModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </>
  );
};

