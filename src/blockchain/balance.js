const utils = require("../lib/util");

exports.balance = async (context, BlockIo) => {
  BlockIo.get_address_by_label(
    {
      label: context.session.user.id
    },
    async (error, data) => {
      if (error) return console.log("Error occured:", error.message);
      await context.sendText(
        `You currently have ${
          data.data.available_balance
        } doge. ${utils.generateWow()}`
      );
    }
  );
};
