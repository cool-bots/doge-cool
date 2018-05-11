exports.balance = async (context, BlockIo) => {
  BlockIo.get_address_by_label({
    label: 'default'
  }, (error, data) => {
    if (error) return console.log("Error occured:", error.message);
    console.log('Your account balance is', balance);
    BlockIo.get_balance({}, console.log);
  });
};
