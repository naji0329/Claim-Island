import { memo, useEffect, useState } from "react";
import { Text } from "@react-three/drei";

import { ClamScene } from "./ClamScene";
import { Clam } from "../clams/Clam";
import { getTraits } from "../three/3DClams/main";
import { loadAllTextures, getClamDir } from "../../utils/konva";

export const Clam3DView = memo((props) => {
  const {
    width,
    height,
    clamDna,
    decodedDna,
    clamViewer,
    clamTraits,
    rgb,
  } = props;
  const [textures, setTextures] = useState();
  const defaultTraits = clamTraits ? clamTraits : getTraits();
  const clamType = defaultTraits.shellShape.toLowerCase();
  const tongueType = defaultTraits.tongue.toLowerCase();

  useEffect(() => {
    async function loadTextures() {
      const clamDir = getClamDir(defaultTraits);
      const layers = await loadAllTextures(defaultTraits, clamDir, rgb);

      setTextures(layers.map(layer => layer.toCanvas()));
    }

    loadTextures();
  }, []);

  return (
    <div style={{width: '100%', height, maxWidth: width}}>
      <ClamScene>
        {textures && (
          <Clam
            clamType={'common' || clamType}
            tongueType={tongueType}
            textures={textures}
          />
        ) }
        {!textures && (
          <Text>Loading</Text>
        )}
      </ClamScene>
    </div>
  )
});

export default Clam3DView;
