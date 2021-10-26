import { generateWow, generateCongrats } from '../lib/utils';
import { sendToAddress } from '../lib/sendToAddress';
import { Context } from '../types/bottender';
import help from './help';

const tip = async (context: Context) => {
  let [, , toLabel, amount] = context.event.text.split(' ');
  if (!toLabel || !amount) {
    help(context);
    return;
  }
  const myLabel = context.session.user.id;
  toLabel = toLabel.replace(/[<>@]/g, '');

  if (Number(amount) < 2) {
    return context.sendText(
      `Come on, don't be stingy! I can't even pay the network rent with that!. ${generateWow()}`
    );
  }

  try {
    await sendToAddress(myLabel, toLabel, amount);

    await context.sendText(
      `${generateCongrats()} <@${toLabel}> you just received ${amount} doge. ${generateWow()}`
    );
  } catch (error) {
    if (
      error.message.includes(
        'One or more destination labels do not exist on your account'
      )
    ) {
      error = `I didn't find the user... :(`;
    }
    return context.sendText(`Oh no!!! ${error}`);
  }
};

export default tip;
