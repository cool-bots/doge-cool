const { SlackOAuthClient } = require("messaging-api-slack");

exports.slackClient = SlackOAuthClient.connect(process.env.SLACK_TOKEN);
