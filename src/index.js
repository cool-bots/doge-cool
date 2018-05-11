const { SlackBot } = require("bottender");
const { createServer } = require("bottender/express");
const { SlackOAuthClient } = require("messaging-api-slack");
const BlockIo = require("block_io");
const dotenv = require("dotenv");
const { withdraw } = require("./withdraw");

dotenv.config();

const blockIo = new BlockIo(
  process.env.BLOCK_IO_API_KEY,
  process.env.BLOCK_IO_SECRET_PIN,
  2
);

const slackClient = SlackOAuthClient.connect(process.env.SLACK_TOKEN);

const bot = new SlackBot({
  accessToken: process.env.SLACK_TOKEN
  // verificationToken: process.env.SLACK_VERIFICATION_TOKEN,
});

bot.onEvent(async context => {
  console.log(context);
  if (context.event.isChannelsMessage || context.event.isGroupsMessage) {
    // tip
    // rain
  } else if (context.event.isText) {
    // balance
    // deposit
    if (/\/withdraw/.test(context.event.text)) {
      await withdraw(context, blockIo);
    }
  } else {
    await context.sentText("I do not understand.");
  }
});

const server = createServer(bot);

server.listen(3000, () => {
  console.log("server is running on 3000 port...");
});
