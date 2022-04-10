import { SpadeModel } from "../models/calmModels/SpadeModel";
import CommonTongueModel from "../models/tongueModels/spade/CommonTongueModel";
import ForkedTongueModel from "../models/tongueModels/spade/ForkedTongueModel";
import HeartTongueModel from "../models/tongueModels/spade/HeartTongueModel";
import SpiralTongueModel from "../models/tongueModels/spade/SpiralTongueModel";
import StarTongueModel from "../models/tongueModels/spade/StarTongueModel";
import { TONGUE_TYPES } from "../../constants/ui/clams";

const TONGUE_COMPONENTS = {
  [TONGUE_TYPES.common]: CommonTongueModel,
  [TONGUE_TYPES.forked]: ForkedTongueModel,
  [TONGUE_TYPES.heart]: HeartTongueModel,
  [TONGUE_TYPES.spiral]: SpiralTongueModel,
  [TONGUE_TYPES.star]: StarTongueModel,
};

const DefaultTongue = () => null;

export const SpadeClam = (props) => {
  const { tongueType, textures } = props;
  const [outerTexture, innerTexture, lipTexture, tongueTexture] = textures;
  const TongueComponent = TONGUE_COMPONENTS[tongueType] || DefaultTongue;
  return (
    <group position={[0.005, 0, -0.04]}>
      <SpadeModel outerTexture={outerTexture} innerTexture={innerTexture} lipTexture={lipTexture} />
      <TongueComponent tongueTexture={tongueTexture} />
    </group>
  );
};
