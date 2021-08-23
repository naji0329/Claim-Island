export const isNeedOutlineModel = (modelsMap, interObject) => {
  return modelsMap.has(interObject.name) ||
    interObject.parent && modelsMap.has(interObject.parent.name)
}
