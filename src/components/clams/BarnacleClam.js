import { BarnacleModel } from "../models/calmModels/BarnacleModel";
import CommonTongueModel from "../models/tongueModels/barnacle/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/barnacle/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/barnacle/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/barnacle/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/barnacle/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const BarnacleClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;

  return (
    <>
      <BarnacleModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </>
  );
};
