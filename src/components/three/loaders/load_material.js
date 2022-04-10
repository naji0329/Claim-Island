import MTLLoader from "../../../loaders/MTLLoader";

// LOAD a Material and then load object
const loadMaterial = ({ materialUrl }) => {
  const loader = new MTLLoader();
  loader.load(
    materialUrl,
    (materials) => {
      // console.log(material);
      materials.preload();
    },
    undefined,
    (error) => {
      console.log("Material Error: ", error);
    }
  );
};

export default loadMaterial;
