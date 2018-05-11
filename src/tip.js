exports.tip = async (context, block_io) => {
  const myLabel = "myLabel";
  const toLabel = "toLabel";
  const ammount = "10";

  client.withdraw_from_labels(
    {
      from_labels: myLabel,
      to_label: toLabel,
      amount: ammount,
      pin: process.env.BLOCK_IO_SECRET_PIN
    },
    (error, data) => {
      if (error) return console.log("Error occured:", error.message);
      console.log(data);
    }
  );
};
