import muchSentences from './muchSentences.json';
import muchCongrats from './muchCongrats.json';

export const getRandomArrayElements = (arr: any[], count: number) => {
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

export const generateWow = () => {
  return getRandomArrayElements(muchSentences, 1);
};

export const generateCongrats = () => {
  return getRandomArrayElements(muchCongrats, 1);
};
