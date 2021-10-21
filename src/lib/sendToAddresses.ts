import {
  prepareTransaction,
  createAndSignTransaction,
  submitTransaction,
} from '../integrations/blockIo';

export const sendToAddress = async (
  fromLabels: string,
  toLabels: string,
  amount: string
) => {
  const preparedTransaction = await prepareTransaction({
    fromLabels: fromLabels,
    toLabel: toLabels,
    amount: amount,
  });
  console.log(JSON.stringify(preparedTransaction, null, 2));

  const signedTransaction = await createAndSignTransaction(preparedTransaction);
  console.log(JSON.stringify(signedTransaction, null, 2));

  const transactionData = await submitTransaction(signedTransaction);
  console.log(JSON.stringify(transactionData, null, 2));

  return transactionData;
};
