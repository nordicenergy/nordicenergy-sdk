// tslint:disable-next-line: no-implicit-dependencies
import { NordicEnergy } from '@nordicenergy-js/core';
// tslint:disable-next-line: no-implicit-dependencies
import { ChainType } from '@nordicenergy-js/utils';
// tslint:disable-next-line: no-implicit-dependencies
import { Account } from '@nordicenergy-js/account';

const CHAIN_ID: number = parseInt(process.env.CHAIN_ID as string, 10);
const CHAIN_TYPE: string = process.env.CHAIN_TYPE as string;
const HTTP_PROVIDER: string = process.env.HTTP_PROVIDER as string;
const GENESIS_PRIV_KEY: string = process.env.GENESIS_PRIV_KEY as string;

let chainType: ChainType = ChainType.NordicEnergy;

if (CHAIN_TYPE === 'net') {
  chainType = ChainType.NordicEnergy;
} else if (CHAIN_TYPE === 'eth') {
  chainType = ChainType.Ethereum;
}

export const nordicenergy: NordicEnergy = new NordicEnergy(HTTP_PROVIDER, {
  chainId: CHAIN_ID,
  chainType,
  chainUrl: HTTP_PROVIDER,
});

export const myAccount: Account = nordicenergy.wallet.addByPrivateKey(
  GENESIS_PRIV_KEY,
);
