const { SlackBot } = require("bottender");
const { createServer } = require("bottender/express");
const { SlackOAuthClient } = require("messaging-api-slack");
const BlockIo = require("block_io");
const dotenv = require("dotenv");

dotenv.config();

const blockIo = new BlockIo(
  process.env.BLOCK_IO_API_KEY,
  process.env.BLOCK_IO_SECRET_PIN,
  process.env.BLOCK_IO_VERSION
);

const slackClient = SlackOAuthClient.connect(process.env.SLACK_TOKEN);

const bot = new SlackBot({
  accessToken: process.env.SLACK_TOKEN
});

bot.onEvent(async context => {});

const server = createServer(bot);

server.listen(3000, () => {
  console.log("server is running on 3000 port...");
});
