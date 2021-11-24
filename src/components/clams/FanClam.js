import { FanModel } from "../models/calmModels/FanModel";
import CommonTongueModel from "../models/tongueModels/fan/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/fan/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/fan/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/fan/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/fan/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const FanClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <>
      <FanModel outerTexture={outerTexture} innerTexture={innerTexture} lipTexture={lipTexture} />
      <TongueComponent tongueTexture={tongueTexture} />
    </>
  );
};
