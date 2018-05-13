const utils = require("../lib/utils");

exports.tip = async (context, block_io) => {
  let [, toLabel, amount] = context.event.text.split(" ");
  const myLabel = context.session.user.id;
  toLabel = toLabel.replace(/[<>@]/g, "");

  block_io.withdraw_from_labels(
    {
      from_labels: myLabel,
      to_label: toLabel,
      amount: amount,
      pin: process.env.BLOCK_IO_SECRET_PIN
    },
    async (error, data) => {
      if (error) return console.log("Error occured:", error.message);
      await context.sendText(
        `${utils.generateCongrats()} <@${toLabel}> you just received ${amount} doge. ${utils.generateWow()}`
      );
    }
  );
};
