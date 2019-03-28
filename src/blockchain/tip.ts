import * as utils from '../lib/utils';
import { Context } from '../types/bottender';
import { withdrawFromLabels } from '../lib/blockIo';
import { help } from './help';

exports.tip = async (context: Context, block_io: any) => {
  let [, , toLabel, amount] = context.event.text.split(' ');
  if (!toLabel || !amount) {
    help(context);
    return;
  }
  const myLabel = context.session.user.id;
  toLabel = toLabel.replace(/[<>@]/g, '');

  if (Number(amount) < 2) {
    return context.sendText(
      `Come on, don't be stingy! I can't even pay the network rent with that!. ${utils.generateWow()}`
    );
  }

  try {
    await withdrawFromLabels({
      fromLabels: myLabel,
      toLabel: toLabel,
      amount: amount,
    });

    await context.sendText(
      `${utils.generateCongrats()} <@${toLabel}> you just received ${amount} doge. ${utils.generateWow()}`
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
