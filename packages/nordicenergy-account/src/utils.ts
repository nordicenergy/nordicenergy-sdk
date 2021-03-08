/**
 * @packageDocumentation
 * @module nordicenergy-account
 * @hidden
 */

import { HttpProvider, Messenger } from '@nordicenergy-js/network';
import { ChainType, ChainID } from '@nordicenergy-js/utils';

export const defaultMessenger = new Messenger(
  new HttpProvider('http://localhost:9500'),
  ChainType.NordicEnergy,
  ChainID.NetLocal,
);
