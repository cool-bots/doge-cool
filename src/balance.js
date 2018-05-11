exports.balance = async (context, BlockIo) => {
  BlockIo.get_address_by_label(
    {
      label: context.session.user.id
    },
    async (error, data) => {
      if (error) return console.log("Error occured:", error.message);
      console.log("Your account balance is", data);
      await context.sendText(`Your balance is: ${data.data.available_balance}`);
    }
  );
};
