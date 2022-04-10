import { memo, useEffect, useState } from "react";
import { connect } from "redux-zero/react";
import * as THREE from "three";

import { ClamScene } from "./ClamScene";
import { Clam } from "../clams/Clam";
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
      setTextures(null);
    };
  }, [clamDna]);

  return (
    <div
      className="w-full relative cursor-grab active:cursor-grabbing"
      style={{ height, maxWidth: width }}
    >
      <div
        className="absolute bg-gray-800 text-white px-4 py-3 rounded-lg top-1/2 left-1/2"
        style={{
          transform: "translate(-50%, -50%)",
        }}
      >
        LOADING
      </div>
      {textures && (
        <ClamScene>
          <Clam
            clamDna={clamDna}
            clamType={clamType}
            tongueType={tongueType}
            textures={textures}
            size={traits.size}
          />
        </ClamScene>
      )}
    </div>
  );
});
const mapToProps = (store) => ({ konvaObjects: store.konvaObjects });
export const Clam3DView = connect(mapToProps, {
  addKonvaObject: actions().addKonvaObject,
  destroyKonvaObjects: actions().destroyKonvaObjects,
})(Clam3DViewComponent);
