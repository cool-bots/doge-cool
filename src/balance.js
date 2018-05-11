const { blockIo } = require('./blockio');

exports.balance = async context => {
  try {
    const data = await blockIo.get_address_by_label(
      {
        label: context.session.user.id
      });
    await context.sendText(`Your balance is: ${data.data.available_balance}`);
  } catch (e) {
    console.log("Error occured:", error.message);
  }
};
