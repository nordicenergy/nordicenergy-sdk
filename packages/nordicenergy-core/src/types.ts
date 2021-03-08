/**
 * @packageDocumentation
 * @module nordicenergy-core
 * @hidden
 */

import { HttpProvider, Messenger } from '@nordicenergy-js/network';
import { TransactionFactory, Transaction } from '@nordicenergy-js/transaction';
import { Wallet, Account } from '@nordicenergy-js/account';
import { ChainType, ChainID } from '@nordicenergy-js/utils';
import { Blockchain } from './blockchain';

export interface NordicEnergyModule {
  HttpProvider: HttpProvider;
  Messenger: Messenger;
  Blockchain: Blockchain;
  TransactionFactory: TransactionFactory;
  Wallet: Wallet;
  Transaction: Transaction;
  Account: Account;
}

export enum UrlType {
  http,
  ws,
}

export interface NordicEnergySetting<T extends ChainType, I extends ChainID> {
  type: T;
  id: I;
}
