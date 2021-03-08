import { nordicenergy } from './nordicenergy';
import txnJsons from '../fixtures/transactions.json';

const messenger = nordicenergy.messenger;

interface TransactionInfo {
  blockHash: string;
  index: string;
  blockNumber: string;
}

describe('e2e test transactions by RPC Method', () => {
  const txnHashesFixtures: any = [];
  const transactionInfoList: any = [];
  // net_*
  it('should test net_sendRawTransaction', async () => {
    const { transactions } = txnJsons;

    for (const txn of transactions) {
      const sent = await messenger.send('net_sendRawTransaction', txn.rawTransaction);
      expect(nordicenergy.utils.isHash(sent.result)).toEqual(true);
      txnHashesFixtures.push(sent.result);
    }
  });
  it('should test net_getTransactionByHash', async () => {
    for (const txnHash of txnHashesFixtures) {
      const txnDetail = await nordicenergy.blockchain.getTransactionByHash({
        txnHash,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.hash).toEqual(txnHash);

        const transactionInfo = {
          blockHash: txnDetail.result.blockHash,
          blockNumber: txnDetail.result.blockNumber,
          index: txnDetail.result.transactionIndex,
        };
        transactionInfoList.push(transactionInfo);
      }
    }
  });
  it('should test net_getTransactionByBlockHashAndIndex', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnDetail: any = await nordicenergy.blockchain.getTransactionByBlockHashAndIndex({
        blockHash: transactionInfo.blockHash,
        index: transactionInfo.index,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockHash).toEqual(transactionInfo.blockHash);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      }
    }
  });
  it('should test net_getTransactionByBlockNumberAndIndex', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnDetail: any = await nordicenergy.blockchain.getTransactionByBlockNumberAndIndex({
        blockNumber: transactionInfo.blockNumber,
        index: transactionInfo.index,
      });
      if (txnDetail.result !== null) {
        expect(checkTransactionDetail(txnDetail.result)).toEqual(true);
        expect(txnDetail.result.blockNumber).toEqual(transactionInfo.blockNumber);
        expect(txnDetail.result.transactionIndex).toEqual(transactionInfo.index);
      }
    }
  });
  it('should test net_getTransactionCountByHash', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await nordicenergy.blockchain.getBlockTransactionCountByHash({
        blockHash: transactionInfo.blockHash,
      });
      expect(nordicenergy.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test net_getTransactionCountByNumber', async () => {
    for (const some of transactionInfoList) {
      const transactionInfo: TransactionInfo = some;
      const txnCount: any = await nordicenergy.blockchain.getBlockTransactionCountByNumber({
        blockNumber: transactionInfo.blockNumber,
      });
      expect(nordicenergy.utils.isHex(txnCount.result)).toEqual(true);
    }
  });
  it('should test net_getTransactionReceipt', async () => {
    const { transactions } = txnJsons;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txnHashesFixtures.length; i += 1) {
      const txnHash = txnHashesFixtures[i];
      const receipt: any = await nordicenergy.blockchain.getTransactionReceipt({
        txnHash,
      });

      if (receipt.result !== null) {
        expect(checkTransactionReceipt(receipt.result)).toEqual(true);
        expect(nordicenergy.crypto.getAddress(receipt.result.from).checksum).toEqual(
          transactions[i].senderAddress,
        );
        expect(nordicenergy.crypto.getAddress(receipt.result.to).checksum).toEqual(
          transactions[i].receiverAddress,
        );
        expect(receipt.result.blockHash).toEqual(transactionInfoList[i].blockHash);
        expect(receipt.result.blockNumber).toEqual(transactionInfoList[i].blockNumber);
        expect(receipt.result.transactionIndex).toEqual(transactionInfoList[i].index);
      }
    }
  });
  it('should test Ngy_getTransactionCount', async () => {
    const { transactions } = txnJsons;

    for (let i = 0; i < transactionInfoList; i += 1) {
      const transactionInfo: TransactionInfo = transactionInfoList[i];
      const nonce: any = await nordicenergy.blockchain.getTransactionCount({
        address: transactions[i].senderAddressBech32,
        blockNumber: transactionInfo.blockNumber,
      });
      expect(nonce.result).toEqual(transactions[i].nonce);
    }
  });
});

function checkTransactionDetail(data: any) {
  return nordicenergy.utils.validateArgs(
    data,
    {
      blockHash: [nordicenergy.utils.isHash],
      blockNumber: [nordicenergy.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      from: [nordicenergy.utils.isValidAddress],
      gas: [nordicenergy.utils.isHex],
      gasPrice: [nordicenergy.utils.isHex],
      hash: [nordicenergy.utils.isHash],
      // tslint:disable-next-line: no-shadowed-variable
      input: [(data: any) => data === '0x' || nordicenergy.utils.isHex(data)],
      nonce: [nordicenergy.utils.isHex],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || nordicenergy.utils.isValidAddress(data)],
      transactionIndex: [nordicenergy.utils.isHex],
      value: [nordicenergy.utils.isHex],
      v: [nordicenergy.utils.isHex],
      r: [nordicenergy.utils.isHex],
      s: [nordicenergy.utils.isHex],
    },
    {},
  );
}

function checkTransactionReceipt(data: any) {
  return nordicenergy.utils.validateArgs(
    data,
    {
      blockNumber: [nordicenergy.utils.isHex],
      contractAddress: [
        // tslint:disable-next-line: no-shadowed-variable
        (data: any) => data === null || nordicenergy.utils.isValidAddress,
      ],
      cumulativeGasUsed: [nordicenergy.utils.isHex],
      from: [nordicenergy.utils.isValidAddress],
      gasUsed: [nordicenergy.utils.isHex],
      logs: [nordicenergy.utils.isArray],
      logsBloom: [nordicenergy.utils.isHex],

      shardID: [nordicenergy.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      to: [(data: any) => data === '0x' || nordicenergy.utils.isValidAddress],
      transactionHash: [nordicenergy.utils.isHash],
      transactionIndex: [nordicenergy.utils.isHex],
    },
    { blockHash: [nordicenergy.utils.isHash], root: [nordicenergy.utils.isHash] },
  );
}
