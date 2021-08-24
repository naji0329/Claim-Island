export const isNeedOutlineModel = (models, interObject) => {
  return (
    models.includes(interObject) || (interObject.parent && models.includes(interObject.parent))
  );
};

export const getOutlineMeshes = (model, meshesSet) =>
  model.children[0].children.reduce((acc, mesh) => {
    if (meshesSet.has(mesh.name)) {
      acc.push(mesh);
    }
    return acc;
  }, []);
