import { Context } from '../types/bottender';
import { getAddressByLabel } from '../lib/blockIo';

export const deposit = async (context: Context) => {
  const label = context.session.user.id;
  const data = await getAddressByLabel(label);
  await context.sendText(
    `Much doge! Please send some dogecoins here -> ${data.data.address}`
  );
};
