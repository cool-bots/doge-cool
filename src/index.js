const { SlackBot } = require("bottender");
const { createServer } = require("bottender/express");

const bot = new SlackBot({
  accessToken: "__FILL_YOUR_TOKEN_HERE__"
});

bot.onEvent(async context => {});

const server = createServer(bot);

server.listen(3000, () => {
  console.log("server is running on 3000 port...");
});
