const rand = (max) => Math.floor(Math.random() * Math.floor(max));
module.exports = (maxChanges, maxCoords, symNumbers) => {
  const tileContent = Array(maxCoords).fill(-1);
  for (let i = 0; i < maxChanges; i++) {
    let randCoord = rand(maxCoords, 0);
    while (tileContent[randCoord] !== -1) {
      randCoord = rand(maxCoords, 0);
    }
    tileContent[randCoord] = rand(symNumbers);
  }
  return tileContent;
};

//getCoords(15, 25, 3);