const puzzleAbstractArt = require('./puzzleAbstractArt');
const getCode = (max, limit = 5, zero = 1) => Array(max).fill(0).map(() => rand(limit, zero));
const rand = (max, zero) => Math.floor(Math.random() * Math.floor(max)) + zero;
const getPhoneNum = getCode(7, 10, 0);

const puzzleAnswers = () => {
  return {
    mirrorCode: getCode(4, 9),
    puzzleAbstractArt: puzzleAbstractArt(15, 25, 3),
    phoneNum: `800${getPhoneNum.join('')}`,
    phoneNumBasement: `(800) ${getPhoneNum.join('').slice(0, 3)} - ####`,
    phoneNumBedroom: `(###) ### - ${getPhoneNum.join('').slice(3, 7)}`,
    phoneCode: getCode(4),
  };
};

module.exports = puzzleAnswers;