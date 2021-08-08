import { memo, useEffect, useState } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

import { ClamScene } from "./ClamScene";
import { Clam } from "../clams/Clam";
import { loadAllTextures, getClamDir } from "../../utils/konva";
import decodeDna from "../three/3DClams/decodeDna";

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
  const traits = clamViewer ? clamTraits : decodeDna(decodedDna);
  const clamType = traits.shellShape.toLowerCase();
  const tongueType = traits.tongue.toLowerCase();

  useEffect(() => {
    async function loadTextures() {
      const clamDir = getClamDir(traits);
      const layers = await loadAllTextures(traits, clamDir, rgb);

      setTextures(layers.map(layer => new THREE.CanvasTexture(layer.toCanvas())));

      return () => {
        textures.forEach((texture) => {texture.dispose()});
      };
    }

    loadTextures();
  }, []);

  return (
    <div style={{width: '100%', height, maxWidth: width, position: "relative"}}>
      {/** Put here some loading animation, it will be shown while canvas is initializing */}
      <div style={{position: "absolute"}}>LOADING</div>
      <ClamScene>
        {textures && (
          <Clam
            clamType={clamType}
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
