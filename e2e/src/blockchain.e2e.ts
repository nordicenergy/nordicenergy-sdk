import { nordicenergy } from './nordicenergy';

import demoAccounts from '../fixtures/testAccount.json';

const bc = nordicenergy.blockchain;

const testAccount = demoAccounts.Accounts[1];

describe('e2e test blockchain', () => {
  // net_*
  it('should test net_peerCount', async () => {
    const peerCount = await bc.net_peerCount();
    expect(nordicenergy.utils.isHex(peerCount.result)).toEqual(true);
  });

  it('should test net_version', async () => {
    const netVersion = await bc.net_version();
    const versionNumber = parseInt(netVersion.result as string, 10);
    expect(netVersion.result).toEqual(`${versionNumber}`);
  });
  it('should test Ngy_protocolVersion', async () => {
    const protocolVersion = await bc.getProtocolVersion();
    expect(nordicenergy.utils.isHex(protocolVersion.result)).toEqual(true);
  });

  // block chain info
  it('should test Ngy_blockNumber', async () => {
    const res = await bc.getBlockNumber();
    expect(res.responseType).toEqual('raw');
    expect(nordicenergy.utils.isHex(res.result)).toEqual(true);
  });
  it('should test Ngy_getBlockByNumber', async () => {
    const res = await bc.getBlockByNumber({ blockNumber: 'latest' });
    const size = res.result.size;
    expect(res.responseType).toEqual('raw');
    expect(nordicenergy.utils.isHex(size)).toEqual(true);
    expect(checkBlockData(res.result)).toEqual(true);
    const res2 = await bc.getBlockByNumber({ blockNumber: res.result.number });
    expect(res2.responseType).toEqual('raw');
    expect(nordicenergy.utils.isHex(res2.result.size)).toEqual(true);
    expect(checkBlockData(res2.result)).toEqual(true);
    const res3 = await bc.getBlockByNumber({ returnObject: true });
    expect(res3.responseType).toEqual('raw');
    expect(checkBlockData(res3.result)).toEqual(true);
  });

  it('should test Ngy_getBlockByHash', async () => {
    const latestBlock = await bc.getBlockByNumber({ blockNumber: 'latest' });
    const res = await bc.getBlockByHash({ blockHash: latestBlock.result.hash });
    expect(res.responseType).toEqual('raw');
    expect(latestBlock.result.hash).toEqual(res.result.hash);
    expect(nordicenergy.utils.isHex(res.result.size)).toEqual(true);
    expect(checkBlockData(res.result)).toEqual(true);
  });

  // account related
  it('should test Ngy_getBalance', async () => {
    const balance = await bc.getBalance({ address: testAccount.Address });
    expect(nordicenergy.utils.isHex(balance.result)).toEqual(true);
  });
});

function checkBlockData(data: any) {
  return nordicenergy.utils.validateArgs(
    data,
    {
      difficulty: [nordicenergy.utils.isNumber],
      // tslint:disable-next-line: no-shadowed-variable
      extraData: [(data: any) => data === '0x' || nordicenergy.utils.isHex(data)],
      gasLimit: [nordicenergy.utils.isHex],
      gasUsed: [nordicenergy.utils.isHex],
      hash: [nordicenergy.utils.isHash],
      logsBloom: [nordicenergy.utils.isHex],
      miner: [nordicenergy.utils.isBech32Address],
      mixHash: [nordicenergy.utils.isHash],
      nonce: [nordicenergy.utils.isNumber],
      number: [nordicenergy.utils.isHex],
      parentHash: [nordicenergy.utils.isHash],
      receiptsRoot: [nordicenergy.utils.isHash],
      size: [nordicenergy.utils.isHex],
      stateRoot: [nordicenergy.utils.isHash],
      timestamp: [nordicenergy.utils.isHex],
      transactionsRoot: [nordicenergy.utils.isHash],
      uncles: [nordicenergy.utils.isArray],
    },
    { transactions: [nordicenergy.utils.isArray] },
  );
}
