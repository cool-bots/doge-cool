import * as utils from '../lib/utils';
import { getAddressByLabel } from '../integrations/blockIo';
import { Context } from '../types/bottender';
import help from './help';
// import coinstring from 'coinstring';
import { promisify } from 'util';

export const withdraw = async (context: Context, blockIo: any) => {
  const fromLabel = context.session.user.id;
  const fromAddress = await getAddressByLabel(fromLabel);
  const availableBalance = Number(fromAddress.data.available_balance);

  let [, , toAddress, amount] = context.event.text.split(' ');
  if (!toAddress || !amount || isNaN(Number(amount))) {
    help(context);
    return;
  }

  if (availableBalance < Number(amount)) {
    await context.sendText(
      `Looks like this amount is above your balance - you only have ${availableBalance} doge!`
    );
    return;
  }

  if (availableBalance < 2) {
    await context.sendText(
      `Such low amount! Much too low to cover fees! ${utils.generateWow()}`
    );
    return;
  }

  // var isValid = coinstring.validate(0x1e, toAddress);
  // if (!isValid) {
  //   await context.sendText(
  //     `Oh no, much typo in your address. It can't be ${toAddress} ?!`
  //   );
  //   return;
  // }

  try {
    await promisify(blockIo.withdraw_from_labels)({
      from_labels: fromLabel,
      to_addresses: toAddress,
      amounts: amount,
      pin: process.env.BLOCK_IO_SECRET_PIN,
    });
    await context.sendText(
      `${utils.generateCongrats()} Such rich! Much withdrawal!`
    );
    return;
  } catch (error) {
    await context.sendText(error.message);
    return;
  }
};

export default withdraw;
