import MTLLoader from '../../../loaders/MTLLoader';

// LOAD a Material and then load object
const loadMaterial = ({
    materialUrl
}) => {
    const loader = new MTLLoader();
    loader.load(materialUrl, function ( materials ) {
        // console.log(material);
        materials.preload();
    }, undefined, function(error) {
        console.log('Material Error: ', error);
    });
};

export default loadMaterial;