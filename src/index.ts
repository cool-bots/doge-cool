import dotenv from 'dotenv';
dotenv.config();

// @ts-ignore
import { SlackBot } from 'bottender';
// @ts-ignore
import { createServer } from 'bottender/express';
// @ts-ignore
import { SlackOAuthClient } from 'messaging-api-slack';
// @ts-ignore
import { pick } from 'lodash';
// @ts-ignore
import BlockIo from 'block_io';

import { Context } from './types/bottender';
import { commands } from './commands';
import CreateAddresses from './lib/createAddresses';

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

const createAddresses = CreateAddresses(slackClient, blockIo);

bot.onEvent(async (context: Context) => {
  let command;
  let commandText;

  // Public / Private channels
  if (context.event.isChannelsMessage || context.event.isGroupsMessage) {
    // Unless @cooldoge is mentioned, don't react
    if (
      context.event.text &&
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

  if (!command) {
    await context.sendText('Much confused');
    await commands.help(context);
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

  setInterval(async () => await createAddresses(), 600000);
});

exports.bot = bot;
