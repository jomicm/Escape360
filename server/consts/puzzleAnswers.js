const puzzleAbstractArt = require('./puzzleAbstractArt');
// const getCode = (max, limit = 5, zero = 1) => Array(max).fill(0).map(() => rand(limit, zero));
const rand = (max, zero) => Math.floor(Math.random() * Math.floor(max)) + zero;
// const getPhoneNum = getCode(7, 10, 0);
const getUniqueCode = (limit, maxNum = 4, zero = 0) => {
  const newRes = [];
  Array(limit).fill(0).map((e, ix) => {
    if (!ix) newRes.push(rand(maxNum, zero));
    else {
      const prev = newRes[ix - 1];
      let ran = rand(4, 0);
      while (prev === ran) ran = rand(maxNum, zero);
      newRes.push(ran);
    }
  });
  return newRes;
};

const getPhoneNum = getUniqueCode(10, 10);
const puzzleAnswers = () => {
  return {
    // mirrorCode: getCode(4, 9),
    mirrorCode: getUniqueCode(4, 9, 1),
    puzzleAbstractArt: puzzleAbstractArt(15, 25, 3),
    // phoneNum: `800${getPhoneNum.join('')}`,
    phoneNum: getPhoneNum.join(''),
    // phoneNumBasement: `(800) ${getPhoneNum.join('').slice(0, 3)} - ####`,
    phoneNumBasement: `(${getPhoneNum.join('').slice(0, 3)}) ${getPhoneNum.join('').slice(3, 6)} - ####`,
    // phoneNumBedroom: `(###) ### - ${getPhoneNum.join('').slice(3, 7)}`,
    phoneNumBedroom: `(###) ### - ${getPhoneNum.join('').slice(6, 10)}`,
    // phoneCode: getCode(4),
    phoneCode: getUniqueCode(4, 5, 1),
    simonCode: [...getUniqueCode(10), 4, 4, 4],
    // bombCode: getCode(4, 10, 0),
    bombCode: getUniqueCode(4, 10, 1),
  };
};

module.exports = puzzleAnswers;
