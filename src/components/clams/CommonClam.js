import { CommonModel } from "../models/calmModels/CommonModel";
import CommonTongueModel from "../models/tongueModels/common/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/common/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/common/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/common/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/common/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const CommonClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <group position={[0.01, 0, -0.05]}>
      <CommonModel
        outerTexture={outerTexture}
        innerTexture={innerTexture}
        lipTexture={lipTexture}
      />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
