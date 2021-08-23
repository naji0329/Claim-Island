export const generateSmokeParticles = () =>
  Array.from({ length: 20 }).reduce((acc, _, index) => {
    const smoke1 = {
      positionX: -0.25 + index * 0.01,
      positionY: Math.random() * 0.07 + 0.015,
      positionZ: -0.2 - index * 0.017,
      key: index + "_1",
      rotationZ: Math.PI * Math.random(),
    };

    const smoke2 = {
      positionX: -0.1 + index * 0.01,
      positionY: Math.random() * 0.07 + 0.015,
      positionZ: -0.2 - index * 0.017,
      key: index + "_2",
      rotationZ: -Math.PI * Math.random(),
    };

    const smoke3 = {
      positionX: 0.05 + index * 0.01,
      positionY: Math.random() * 0.07 + 0.015,
      positionZ: -0.2 - index * 0.017,
      key: index + "_3",
      rotationZ: Math.PI * Math.random(),
    };

    const smoke4 = {
      positionX: 0.2 + index * 0.01,
      positionY: Math.random() * 0.07 + 0.015,
      positionZ: -0.2 - index * 0.017,
      key: index + "_4",
      rotationZ: -Math.PI * Math.random(),
    };

    acc.push(smoke1, smoke2, smoke3, smoke4);
    return acc;
  }, []);
