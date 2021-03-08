import { nordicenergy } from './nordicenergy';
// tslint:disable-next-line: no-implicit-dependencies
import { Transaction, TxStatus } from '@nordicenergy-js/transaction';
// tslint:disable-next-line: no-implicit-dependencies
import { isHash, numberToHex } from '@nordicenergy-js/utils';
import txnJsons from '../fixtures/transactions.json';
import demoAccounts from '../fixtures/testAccount.json';

const receiver = demoAccounts.Accounts[3];
jest.useRealTimers();

describe('test Transaction using SDK', () => {
  let signed: Transaction;
  let sent: Transaction;
  let txId: string;

  it('should test recover signedTransaction', () => {
    const txns = txnJsons.transactions;
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < txns.length; i += 1) {
      const newTxn = nordicenergy.transactions.newTx();

      newTxn.recover(txns[i].rawTransaction);
      expect(newTxn.txParams.from).toEqual(txns[i].senderAddress);
      expect(newTxn.txParams.to).toEqual(txns[i].receiverAddress);
      expect(`0x${newTxn.txParams.gasLimit.toString(16)}`).toEqual(txns[i].gasLimit);
      expect(`0x${newTxn.txParams.gasPrice.toString(16)}`).toEqual(txns[i].gasPrice);
      expect(`0x${newTxn.txParams.value.toString(16)}`).toEqual(txns[i].value);
      expect(`${numberToHex(newTxn.txParams.nonce)}`).toEqual(txns[i].nonce);
    }
  });
  it('should test signTransaction', async () => {
    const txnObject = {
      to: nordicenergy.crypto.getAddress(receiver.Address).bech32,
      value: '0x64',
      gasLimit: '210000',
      gasPrice: new nordicenergy.utils.Unit('100').asGwei().toWei(),
    };

    const txn = nordicenergy.transactions.newTx(txnObject);
    signed = await nordicenergy.wallet.signTransaction(txn);

    expect(signed.isSigned()).toEqual(true);
  });
  it('should send transaction', async () => {
    const [sentTxn, id] = await signed.sendTransaction();
    expect(sentTxn.isPending()).toEqual(true);
    expect(nordicenergy.utils.isHash(id)).toEqual(true);
    txId = id;
    sent = sentTxn;
  });
  it('should confirm a transaction', async () => {
    const toConfirm = await sent.confirm(txId, 20, 1000);
    expect(toConfirm.receipt !== undefined).toEqual(true);
    expect(checkTransactionReceipt(toConfirm.receipt)).toEqual(true);
    if (toConfirm.isConfirmed()) {
      expect(toConfirm.txStatus).toEqual(TxStatus.CONFIRMED);
    } else if (toConfirm.isRejected()) {
      expect(toConfirm.txStatus).toEqual(TxStatus.REJECTED);
    }
  });
  it('should test transaction observed events', async () => {
    const txnObject = {
      to: nordicenergy.crypto.getAddress(receiver.Address).bech32,
      value: new nordicenergy.utils.Unit('100').asGwei().toWei(),
      gasLimit: new nordicenergy.utils.Unit('210000').asWei().toWei(),
      gasPrice: new nordicenergy.utils.Unit('100').asGwei().toWei(),
    };

    const txn = nordicenergy.transactions.newTx(txnObject);
    txn
      .observed()
      .on('transactionHash', (transactionHash) => {
        expect(isHash(transactionHash)).toEqual(true);
      })
      .on('receipt', (receipt) => {
        expect(checkTransactionReceipt(receipt)).toEqual(true);
      })
      .on('confirmation', (confirmation) => {
        expect(confirmation === TxStatus.REJECTED || confirmation === TxStatus.CONFIRMED).toBe(
          true,
        );
      })
      .on('error', (error) => {
        expect(error).toBeTruthy();
      });
    const txnSigned = await nordicenergy.wallet.signTransaction(txn);
    const [txnSent, id] = await txnSigned.sendTransaction();
    expect(txnSent.txStatus).toEqual(TxStatus.PENDING);
    await txnSigned.confirm(id);
  });
});

function checkTransactionReceipt(data: any) {
  return nordicenergy.utils.validateArgs(
    data,
    {
      blockHash: [nordicenergy.utils.isHash],
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
    { root: [nordicenergy.utils.isHash] },
  );
}
