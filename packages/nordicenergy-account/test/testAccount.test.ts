/**
 * @packageDocumentation
 * @module nordicenergy-account
 * @ignore
 */

import { Account } from '../src/account';
import { HttpProvider, Messenger } from '@nordicenergy-js/network';
import { ChainType, ChainID } from '@nordicenergy-js/utils';

const provider = new HttpProvider('http://localhost:9500');
const messenger = new Messenger(provider, ChainType.NordicEnergy, ChainID.NgyLocal);

describe('test account', () => {
  it('test Account.getBalance returns object that implements Balance interface', () => {
    const acc = Account.new();
    acc.setMessenger(messenger);
    acc.getBalance().then((res) => {
      expect(res).not.toBeNull();
      expect(res.balance).not.toBeNull();
      expect(res.nonce).not.toBeNull();
      expect(res.shardID).not.toBeNull();
    });
  });
});
