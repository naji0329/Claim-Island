import { memo, useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import * as THREE from "three";

import { ClamScene } from "./ClamScene";
import { Clam } from "../clams/Clam";
import { Loading3DView } from "../Loading3DView";
import { loadAllTextures, getClamDir } from "../../utils/konva";
import { decodeDna } from "../../utils/decodeDna";
import { actions } from "../../store/redux";

const Clam3DViewComponent = memo((props) => {
  const {
    width,
    height,
    clamDna,
    decodedDna,
    clamViewer,
    clamTraits,
    rgb,
    addKonvaObject,
    destroyKonvaObjects,
  } = props;
  const [textures, setTextures] = useState();
  const traits = clamViewer ? clamTraits : decodeDna(decodedDna);
  // const traits = clamTraits;
  const clamType = traits.shellShape.toLowerCase();
  const tongueType = traits.tongue.toLowerCase();

  useEffect(() => {
    async function loadTextures() {
      const clamDir = getClamDir(traits);
      const layers = await loadAllTextures(traits, clamDir, rgb, addKonvaObject);
      setTextures(
        layers.map((layer) => {
          let texture = new THREE.CanvasTexture(layer.toCanvas());
          texture.flipY = false;
          return texture;
        })
      );
    }

    loadTextures();

    return () => {
      destroyKonvaObjects();
    };
  }, []);

  return (
    <div style={{ width: "100%", height, maxWidth: width, position: "relative" }}>
      {/** Put here some loading animation, it will be shown while canvas is initializing */}
      <div style={{ position: "absolute" }}>LOADING</div>
      <ClamScene>
        {textures && (
          <Clam
            clamDna={clamDna}
            clamType={clamType}
            tongueType={tongueType}
            textures={textures}
            size={traits.size}
          />
        )}
        {!textures && <Loading3DView />}
      </ClamScene>
    </div>
  );
});
const mapToProps = (store) => ({ konvaObjects: store.konvaObjects });
export const Clam3DView = connect(mapToProps, {
  addKonvaObject: actions().addKonvaObject,
  destroyKonvaObjects: actions().destroyKonvaObjects,
})(Clam3DViewComponent);
