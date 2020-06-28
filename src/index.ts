import { Action, SlackContext } from 'bottender';
import { router, slack } from 'bottender/router';
import BlockIo from 'block_io';
import { MessageTypes } from './types';
import CreateAddresses from './lib/createAddresses';
import getChannelMembers from './lib/members';
import { getRandomArrayElements, generateWow } from './lib/utils';
import sendDoge from './lib/sendDoge';
import { getAddressByLabel } from './integrations/blockIo';
import help from './lib/help';

const blockIo = new BlockIo(
  process.env.BLOCK_IO_API_KEY,
  process.env.BLOCK_IO_SECRET_PIN,
  2
);

let isAddressesCreated = false;

const App = async (context: SlackContext): Promise<Action<SlackContext>> => {
  // Create doge wallet for users if they don't have already
  if (!isAddressesCreated) {
    await CreateAddresses(context.client, blockIo);
    isAddressesCreated = true;
  }

  // Handle slash commands
  if (context.event.isCommand) {
    return handleSlashCommand;
  }

  return router([slack.any(handleAnyEvent)]);
};

const handleSlashCommand = async (context: SlackContext) => {
  const command = context.event._rawEvent.command;
  const sender = context.event._rawEvent.U016AMQRVD2;
  const data = await getAddressByLabel(sender);

  switch (command) {
    case '/balance':
      await context.chat.postEphemeral({
        text: `You currently have ${
          data.data.available_balance
        } doge. ${generateWow()}`,
      });

      break;
    case '/deposit':
      await context.chat.postEphemeral({
        text: `Much doge! Please send some dogecoins here -> ${data.data.address}`,
      });
      break;
    case '/withdraw':
      await context.chat.postEphemeral({
        text: 'Ehehehe no way!! :cool-doge:',
      });

      break;
  }
};

const handleAnyEvent = async (context: SlackContext) => {
  const { type } = context.event._rawEvent;

  // Handle bot mentions (probably someone wants to send some doge)
  if (type === MessageTypes.MENTION) {
    const message = context.event._rawEvent.text;
    const tipPattern = /(<@[\w]*>)(\s*)(tip)(\s*)((<@[\w]*>\s?)*)(\s*)(\d*)/gi;
    const randomPattern = /(<@[\w]*>)(\s*)(random)(\s*)(\d*)/gi;
    const rainPattern = /(<@[\w]*>)(\s*)(rain)(\s*)(\d*)/gi;

    const tipMatches = [...message.matchAll(tipPattern)];
    const randomMatches = [...message.matchAll(randomPattern)];
    const rainMatches = [...message.matchAll(rainPattern)];

    // TIP
    if (tipMatches.length > 0) {
      const amount = Number(tipMatches[0][8]);
      const recipientsPart = tipMatches[0][5];
      const recipientMatches = [...recipientsPart.matchAll(/(@[\w]*)/g)];
      const recipients = recipientMatches.map((item) =>
        item[0].replace('@', '')
      );

      if (amount < 2) {
        await context.chat.postEphemeral({
          text: `Come on, don't be stingy! I can't even pay the network rent with that!.`,
        });
        return;
      }
      await sendDoge(context, blockIo, recipients, amount);
      return;
    }

    // RANDOM
    if (randomMatches.length > 0) {
      const amount = Number(randomMatches[0][5]);
      const members: string[] = await getChannelMembers(context);
      const pickedMember = getRandomArrayElements(members, 1);
      await sendDoge(context, blockIo, pickedMember, amount);
      return;
    }

    // RAIN
    if (rainMatches.length > 0) {
      const maxMembers = 5;
      const amount = rainMatches[0][5];
      const members = await getChannelMembers(context);
      const pickedMembers: string[] = getRandomArrayElements(
        members,
        maxMembers
      );
      await sendDoge(
        context,
        blockIo,
        pickedMembers,
        amount / pickedMembers.length
      );
      return;
    }

    // Command mismatched. So, send help message to the user
    help(context);
  }
};

export default App;
