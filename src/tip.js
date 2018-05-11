const { blockIo } = require('./blockio');

exports.tip = async context => {
  let [, toLabel, amount] = context.event.text.split(" ");
  const myLabel = context.session.user.id;
  toLabel = toLabel.replace(/[<>@]/g, "");

  try {
    const data = await blockIo.withdraw_from_labels(
      {
        from_labels: myLabel,
        to_label: toLabel,
        amount: amount,
        pin: process.env.BLOCK_IO_SECRET_PIN
      });
    console.log(data);
  } catch (e) {
    console.log("Error occured:", error.message);
  }
};
