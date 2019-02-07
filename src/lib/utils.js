const muchSentences = require("./muchSentences.json");
const muchCongrats = require("./muchCongrats.json");

const getRandomArrayElements = (arr, count) => {
  if (arr.length <= count) {
    return arr;
  }
  let shuffled = arr.slice(0),
    i = arr.length,
    min = i - count,
    temp,
    index;
  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(min);
};

const generateWow = () => {
  return getRandomArrayElements(muchSentences, 1);
};

const generateCongrats = () => {
  return getRandomArrayElements(muchCongrats, 1);
};

exports.generateWow = generateWow;
exports.generateCongrats = generateCongrats;
exports.getRandomArrayElements = getRandomArrayElements;
