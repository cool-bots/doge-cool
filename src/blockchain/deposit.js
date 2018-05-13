exports.deposit = async (context, block_io) => {
  block_io.get_address_by_label(
    {
      label: context.session.user.id
    },
    async (error, data) => {
      if (error) return console.log("Error occured:", error.message);
      await context.sendText(
        `Much doge! Please send some dogecoins here -> ${data.data.address}`
      );
    }
  );
};
