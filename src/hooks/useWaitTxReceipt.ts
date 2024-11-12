import {useEffect, useRef, useState} from 'react';
import {useWaitForTransactionReceipt} from 'wagmi';

const MAXIMUM_RETRY_COUNT = 30;

export const useWaitForTransaction = () => {
  const [retryCount, setRetryCount] = useState<number>(0);
  const [transactionHash, setTransactionHash] = useState<string>('');
  const [transactionStatus, setTransactionStatus] = useState({isSuccess: false, isError: false});
  const {isSuccess, isError, data} = useWaitForTransactionReceipt({hash: transactionHash as `0x${string}`});

  const transactionStatusRef = useRef<any>(null);

  transactionStatusRef.current = transactionStatus;

  const waitForTransactionReceipt = (hash: string): Promise<any> => {
    return new Promise((resolve, reject) => {
      setTransactionHash(hash);

      const interval = setInterval(async () => {
        if (retryCount >= MAXIMUM_RETRY_COUNT) {
          clearInterval(interval);
          reject({message: 'error'});
        }
        if (transactionStatusRef.current) {
          if (transactionStatusRef.current.isSuccess) {
            clearInterval(interval);
            // const receipt = await getTransactionReceipt(config, {hash: hash as `0x${string}`});

            setTimeout(() => {
              resolve(data); // return the full receipt here
            }, 1500);
          } else if (transactionStatusRef.current.isError) {
            clearInterval(interval);
            reject(new Error('Transaction failed'));
          }
        }

        setRetryCount(prev => prev + 1);
      }, 1000);
    });
  };
  useEffect(() => {
    setRetryCount(0);
  }, [transactionHash]);

  useEffect(() => {
    setTransactionStatus({isSuccess, isError});
  }, [isSuccess, isError]);

  return {waitForTransactionReceipt};
};
