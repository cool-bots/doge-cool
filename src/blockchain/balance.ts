import { Context } from '../types/bottender';
import { getAddressByLabel } from '../lib/blockIo';
import utils from '../lib/utils';

export const balance = async (context: Context) => {
  const label = context.session.user.id;
  const data = await getAddressByLabel(label);
  await context.sendText(
    `You currently have ${
      data.data.available_balance
    } doge. ${utils.generateWow()}`
  );
};
