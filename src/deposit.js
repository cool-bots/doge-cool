exports.deposit = async (context, block_io) => {
  block_io.get_address_by_label(
    {
      label: context.session.user.id
    },
    async (error, data) => {
      if (error) return console.log("Error occured:", error.message);
      console.log("please deposit some doge$$$ to this address", data);
      await context.sendText(`I do not understand. ${data.data.address}`);
    }
  );
};
