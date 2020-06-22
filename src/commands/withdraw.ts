import help from './help';
import * as utils from '../lib/utils';
import { getAddressByLabel } from '../integrations/blockIo';
import { Context } from '../types/bottender';

export const withdraw = async (context: Context, blockIo: any) => {
  const fromLabel = context.session.user.id;
  const fromAddress = await getAddressByLabel(fromLabel);
  const availableBalance = Number(fromAddress.data.available_balance);

  const [, toAddress, amount] = context.event.text.split(' ');
  if (!toAddress || !amount || isNaN(+amount)) {
    help(context);
    return;
  }

  if (availableBalance < +amount) {
    await context.sendText(
      `Looks like this amount is above your balance - you only have ${availableBalance} doge!`
    );
    return;
  }

  if (+amount < 2) {
    await context.sendText(
      `Such low amount! Much too low to cover fees! ${utils.generateWow()}`
    );
    return;
  }

  const isValid = /[AD9]{1}[5-9A-HJ-NP-U]{1}[1-9A-HJ-NP-Za-km-z]{32}/.test(
    toAddress
  );
  if (!isValid) {
    await context.sendText(
      `Oh no, much typo in your address. It can't be ${toAddress} ?!`
    );
    return;
  }

  try {
    await new Promise((resolve, reject) => {
      blockIo.withdraw_from_labels({
        from_labels: fromLabel,
        to_addresses: toAddress,
        amounts: amount,
        pin: process.env.BLOCK_IO_SECRET_PIN,
      });
      (error: any, res: any) => {
        if (error) {
          return reject(error);
        }
        resolve();
      };
    });
    await context.sendText(
      `${utils.generateCongrats()} Such rich! Much withdrawal!`
    );
    return;
  } catch (error) {
    await context.sendText(error.message);
  }
};

export default withdraw;
