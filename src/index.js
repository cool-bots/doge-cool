const { SlackBot } = require("bottender");
const { createServer } = require("bottender/express");
const { SlackOAuthClient } = require("messaging-api-slack");
const BlockIo = require("block_io");
const dotenv = require("dotenv");
const { deposit } = require("./blockchain/deposit");
const { withdraw } = require("./blockchain/withdraw");
const { balance } = require("./blockchain/balance");
const { tip } = require("./blockchain/tip");
const { rain } = require("./blockchain/rain");
const { help } = require("./blockchain/help");
const { random } = require("./blockchain/random");

dotenv.config();

const blockIo = new BlockIo(
  process.env.BLOCK_IO_API_KEY,
  process.env.BLOCK_IO_SECRET_PIN,
  2
);

const slackClient = SlackOAuthClient.connect(process.env.SLACK_TOKEN);

const bot = new SlackBot({
  accessToken: process.env.SLACK_TOKEN,
  verificationToken: process.env.SLACK_VERIFICATION_TOKEN
});

const createAddresses = require("./blockchain/createAddresses")(
  slackClient,
  blockIo
);

bot.onEvent(async context => {
  // Public / Private channels
  if (context.event.isChannelsMessage || context.event.isGroupsMessage) {
    // Unless @cooldoge is mentioned, don't react

    console.log(context.event);
    if (!context.event.text.includes(`<@${process.env.BOT_USER_ID}>`)) {
      return;
    }

    if (/tip/.test(context.event.text)) {
      // valid only in public channels
      console.log("fooo");
      await tip(context, blockIo);
    } else if (/rain/.test(context.event.text)) {
      await rain(context, blockIo, slackClient);
    } else if (/random/.test(context.event.text)) {
      await random(context, blockIo, slackClient);
    }

    // DM with @cooldoge
  } else if (context.event.isText) {
    if (/balance/.test(context.event.text)) {
      await balance(context, blockIo);
    } else if (/deposit/.test(context.event.text)) {
      await deposit(context, blockIo);
    } else if (/\/withdraw/.test(context.event.text)) {
      await withdraw(context, blockIo);
    } else if (/help/.test(context.event.text)) {
      await help(context);
    } else {
      await context.sendText("Much confused");
      await help(context);
    }
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

  console.log("Much awesome! server is flipping on port 3000.");
  await createAddresses();
});

exports.bot = bot;
