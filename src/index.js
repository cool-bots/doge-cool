const { SlackBot } = require("bottender");
const { createServer } = require("bottender/express");
const { SlackOAuthClient } = require("messaging-api-slack");
const BlockIo = require("block_io");
const dotenv = require("dotenv");
const { deposit } = require("./deposit");
const { withdraw } = require("./withdraw");
const { balance } = require("./balance");
const { tip } = require("./tip");
const { rain } = require("./rain");

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

const createAddresses = require("./createAddresses")(slackClient, blockIo);

bot.onEvent(async context => {
  if (context.event.isChannelsMessage || context.event.isGroupsMessage) {
    if (/tip/.test(context.event.text)) {
      await tip(context, blockIo);
    } else if (/rain/.test(context.event.text)) {
      await rain(context, blockIo, slackClient);
    }
  } else if (context.event.isText) {
    if (/balance/.test(context.event.text)) {
      await balance(context, blockIo);
    }
    if (/deposit/.test(context.event.text)) {
      await deposit(context, blockIo);
    }
    if (/\/withdraw/.test(context.event.text)) {
      await withdraw(context, blockIo);
    }
  }
});

const server = createServer(bot);

server.listen(3000, async () => {
  console.log("Much awesome! server is flipping on 3000 port...");
  await createAddresses();
});

exports.bot = bot;
