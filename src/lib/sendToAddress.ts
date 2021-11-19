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

  const signedTransaction = await createAndSignTransaction(preparedTransaction);

  const transactionData = await submitTransaction(signedTransaction);

  return transactionData;
};
