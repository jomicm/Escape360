const getCode = (max, limit = 5, zero = 1) => Array(max).fill(0).map(() => rand(limit, zero));
const rand = (max, zero) => Math.floor(Math.random() * Math.floor(max)) + zero;
const getPhoneNum = getCode(7, 10, 0);
const getSimonCode = (max) => {
  const newRes = [];
  Array(max).fill(0).map((e, ix) => {
    if (!ix) newRes.push(rand(4, 0));
    else {
      const prev = newRes[ix - 1];
      let ran = rand(4, 0);
      while (prev === ran) ran = rand(4, 0);
      newRes.push(ran);
    }
  });
  return newRes;
};

const puzzleAnswers = () => {
  return {
    phoneNum: `800${getPhoneNum.join('')}`,
    phoneNumBasement: `(800) ${getPhoneNum.join('').slice(0, 3)} - ####`,
    phoneNumBedroom: `(###) ### - ${getPhoneNum.join('').slice(3, 7)}`,
    phoneCode: getCode(4),
    simonCode: [...getSimonCode(10), 4, 4, 4],
    bombCode: getCode(4, 10, 0),
  };
};

module.exports = puzzleAnswers;
