import * as utils from '../lib/utils';
import { Context } from '../types/bottender';
import { getAddressByLabel } from '../lib/blockIo';

export const balance = async (context: Context) => {
  const data = await getAddressByLabel(context.session.user.id);
  await context.sendText(
    `You currently have ${
      data.data.available_balance
    } doge. ${utils.generateWow()}`
  );
};
