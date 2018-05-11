const { SlackBot } = require("bottender");
const { createServer } = require("bottender/express");
const dotenv = require("dotenv");
const { deposit } = require("./deposit");
const { withdraw } = require("./withdraw");
const { balance } = require("./balance");
const { tip } = require("./tip");
const {createAddresses} = require("./createAddresses");

dotenv.config();

const bot = new SlackBot({
  accessToken: process.env.SLACK_TOKEN,
  verificationToken: process.env.SLACK_VERIFICATION_TOKEN
});


bot.onEvent(async context => {
  if (context.event.isChannelsMessage || context.event.isGroupsMessage) {
    console.log(context);
    if (/tip/.test(context.event.text)) {
      await tip(context);
    }
  } else if (context.event.isText) {
    // balance
    console.log(context.event.text);
    if (/balance/.test(context.event.text)) {
      await balance(context);
    }
    if (/deposit/.test(context.event.text)) {
      await deposit(context);
    }
    if (/\/withdraw/.test(context.event.text)) {
      await withdraw(context);
    }
  } else {
    await context.sentText("I do not understand.");
  }
});

const server = createServer(bot);

server.listen(3000, async () => {
  console.log("server is running on 3000 port...");
  await createAddresses();
});
