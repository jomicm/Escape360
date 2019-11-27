const rand = (max) => Math.floor(Math.random() * Math.floor(max));
module.exports = (maxChanges, maxCoords, symNumbers) => {
  let coords;
  const len = 5;
  coords = Array(maxCoords).fill(-1);
  for (let i = 0; i < maxChanges; i++) {
    let randCoord = rand(maxCoords, 0);
    while (coords[randCoord] !== -1) {
      randCoord = rand(maxCoords, 0);
    }
    coords[randCoord] = rand(symNumbers);
  }
  let randomTransformation = rand(5);
  let coordsAnswers;
  if (randomTransformation === 0) {
    coordsAnswers = mirrorMatrix(coords, len);
  } else {
    coordsAnswers = rotateMatrix(coords, len, randomTransformation);
  }
  return { coords, coordsAnswers, randomTransformation };
};

//getCoords(15, 25, 3);
const mirrorMatrix = (coords, len) => {
  let res = [];
  for (let i = 0; i < len; i++) {
    const row = coords.slice(i * len, i * len + len);
    res = [...res, ...row.reverse()];
  }
  return res;
};

const rotateMatrix = (coords, len, times = 1) => {
  let mat, res;
  for (let i = 0; i < times; i++) {
    mat = []; res = [];
    for (let i = 0; i < len; i++) {
      const row = coords.slice(i * len, i * len + len);
      mat.push(row);
    }
    for (let i = 0; i < len; i++) {
      let rotRow = mat.map(r => r[i]).reverse();
      res = [...res, ...rotRow];
    }
    coords = [...res];
  }
  return res;
};