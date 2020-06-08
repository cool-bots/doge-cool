// @ts-ignore
import BlockIo from 'block_io';

const blockIo = new BlockIo({
  api_key: process.env.BLOCK_IO_API_KEY,
  pin: process.env.BLOCK_IO_SECRET_PIN,
  version: 2,
});

export const getNewAddress = (x: any): Promise<any> =>
  new Promise((resolve, reject) => {
    blockIo.get_new_address(x, (error: Error | undefined, data: any) => {
      if (error) return reject(error);
      resolve(data);
    });
  });

export const getAddressByLabel = (label: string): Promise<any> =>
  new Promise((resolve, reject) => {
    blockIo.get_address_by_label(
      { label },
      (error: Error | undefined, data: any) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });

export const withdrawFromLabels = ({
  fromLabels,
  toLabel,
  amount,
}: {
  fromLabels: string;
  toLabel: string;
  amount: number | string;
}): Promise<any> =>
  new Promise((resolve, reject) => {
    blockIo.withdraw_from_labels(
      {
        from_labels: fromLabels,
        to_label: toLabel,
        amount: amount,
        pin: process.env.BLOCK_IO_SECRET_PIN,
      },
      (error: Error | undefined, data: any) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
