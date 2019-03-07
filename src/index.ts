import { Context } from './types/bottender';

const { SlackBot } = require('bottender');
const { createServer } = require('bottender/express');
const { SlackOAuthClient } = require('messaging-api-slack');
const BlockIo = require('block_io');
const dotenv = require('dotenv');
const { pick } = require('lodash');
const { deposit } = require('./blockchain/deposit');
const { withdraw } = require('./blockchain/withdraw');
const { balance } = require('./blockchain/balance');
const { tip } = require('./blockchain/tip');
const { rain } = require('./blockchain/rain');
const { help } = require('./blockchain/help');
const { random } = require('./blockchain/random');

dotenv.config();

const blockIo = new BlockIo(
  process.env.BLOCK_IO_API_KEY,
  process.env.BLOCK_IO_SECRET_PIN,
  2
);

const slackClient = SlackOAuthClient.connect(process.env.SLACK_TOKEN);

const bot = new SlackBot({
  accessToken: process.env.SLACK_TOKEN,
  verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
});

const createAddresses = require('./blockchain/createAddresses')(
  slackClient,
  blockIo
);

const commands = {
  balance: balance,
  deposit: deposit,
  withdraw: withdraw,
  help: help,
  tip: tip,
  rain: rain,
  random: random,
};

bot.onEvent(async (context: Context) => {
  let command;
  let commandText;

  // Public / Private channels
  if (context.event.isChannelsMessage || context.event.isGroupsMessage) {
    // Unless @cooldoge is mentioned, don't react
    if (
      !context.event.text &&
      !context.event.text.includes(`<@${process.env.BOT_USER_ID}>`)
    ) {
      return;
    }

    commandText = context.event.text
      .trim()
      .split(' ')[1]
      .toLowerCase();

    command = pick(commands, ['tip', 'rain', 'random', 'help'])[commandText];

    // DM with @cooldoge
  } else if (context.event.isText) {
    commandText = context.event.text
      .trim()
      .split(' ')[0]
      .toLowerCase();
    command = pick(commands, ['balance', 'deposit', 'withdraw', 'help'])[
      commandText
    ];
  } else {
    return;
  }

  console.log('context.event.text', context.event.text);
  console.log('commandText', commandText);
  console.log('command', !!command);

  if (!command) {
    await context.sendText('Much confused');
    await help(context);
  } else {
    await command(context, blockIo, slackClient);
  }
});

const server = createServer(bot);

server.listen(3000, async () => {
  console.log(`
    very pretty!          such cool!          more plz!
        much awesome
    wow                       very nodeJS
  
    __  __            _      __          ________          ___ 
   |  \\/  |          | |     \\ \\        / / __ \\ \\        / / |
   | \\  / |_   _  ___| |__    \\ \\  /\\  / / |  | \\ \\  /\\  / /| |
   | |\\/| | | | |/ __| '_ \\    \\ \\/  \\/ /| |  | |\\ \\/  \\/ / | |
   | |  | | |_| | (__| | | |    \\  /\\  / | |__| | \\  /\\  /  |_|
   |_|  |_|\\__,_|\\___|_| |_|     \\/  \\/   \\____/   \\/  \\/   (_)
                                                               
                  wow                   code plz                      
        epic bot        much rain                       very terminal
   very swag!                                so wow!
  `);

  console.log('Much awesome! server is flipping on port 3000.');
  await createAddresses();
});

exports.bot = bot;
