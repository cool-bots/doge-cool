module.exports = {
  session: {
    driver: 'memory',
    stores: {
      memory: {
        maxSize: 500,
      },
    },
  },
  initialState: {},
  channels: {
    slack: {
      enabled: true,
      path: '/',
      accessToken: process.env.SLACK_ACCESS_TOKEN,
      signingSecret: process.env.SLACK_SIGNING_SECRET,
    },
  },
};
