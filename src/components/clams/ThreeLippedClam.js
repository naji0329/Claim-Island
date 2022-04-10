import { ThreeLippedModel } from "../models/calmModels/ThreeLippedModel";
import CommonTongueModel from "../models/tongueModels/threeLipped/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/threeLipped/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/threeLipped/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/threeLipped/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/threeLipped/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const ThreeLippedClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;

  return (
    <group position={[0.028, 0, -0.022]}>
      <ThreeLippedModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
