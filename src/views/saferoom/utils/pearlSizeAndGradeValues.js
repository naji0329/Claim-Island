export const pearlSize = (pSize) => {
  const size = parseInt(pSize);
  if (size >= 90) {
    return "XXL";
  } else if (size >= 80) {
    return "XL";
  } else if (size >= 70) {
    return "L";
  } else if (size >= 50) {
    return "M";
  } else if (size >= 40) {
    return "S";
  } else if (size >= 30) {
    return "XS";
  } else {
    return "XXS";
  }
};

export const pearlGrade = (surface, lustre, nacre) => {
  const grade = parseInt(surface) + parseInt(lustre) + parseInt(nacre);
  const totalGradePossible = 300;

  if (grade >= 0.95 * totalGradePossible) {
    return "AAA";
  } else if (grade >= 0.9 * totalGradePossible) {
    return "AA+";
  } else if (grade >= 0.8 * totalGradePossible) {
    return "AA";
  } else if (grade >= 0.7 * totalGradePossible) {
    return "A";
  } else if (grade >= 0.6 * totalGradePossible) {
    return "B";
  } else if (grade >= 0.5 * totalGradePossible) {
    return "C";
  } else {
    return "D";
  }
};
