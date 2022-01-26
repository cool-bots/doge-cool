import { Context } from '../types/bottender';

const shush = async (context: Context) => {
  const sentences = ['no, you shush!', 'sssshhh'];
  const sentence = sentences[Math.floor(Math.random() * sentences.length)];

  await context.sendText(sentence);
};

export default shush;
