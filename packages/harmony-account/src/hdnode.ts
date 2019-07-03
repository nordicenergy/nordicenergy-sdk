import {
  bip39,
  hdkey,
  encryptPhrase,
  decryptPhrase,
  EncryptOptions,
} from '@harmony-js/crypto';
import { HDPath } from '@harmony-js/utils';

export class HDNode extends hdkey {
  static new() {
    return new HDNode(bip39.generateMnemonic(), 0);
  }
  static add(phrase: string, index: number) {
    return new HDNode(phrase, index);
  }
  static isValidMnemonic(phrase: string): boolean {
    if (phrase.trim().split(/\s+/g).length < 12) {
      return false;
    }
    return bip39.validateMnemonic(phrase);
  }
  static generateMnemonic(): string {
    return bip39.generateMnemonic();
  }
  private path: string;
  private mnemonic?: string;
  private entropy?: string;
  private childKey?: hdkey;

  constructor(menmonic?: string, index: number = 0) {
    super();
    this.path = HDPath;
    this.mnemonic = menmonic;
    this.entropy = this.mnemonic ? this.getEntropy(this.mnemonic) : undefined;
    this.childKey = this.entropy
      ? this.getChildKey(this.entropy, index)
      : undefined;
  }

  getEntropy(mnemonic: string) {
    return bip39.mnemonicToEntropy(mnemonic);
  }
  getChildKey(entropy: string, index: number) {
    const master = HDNode.fromMasterSeed(Buffer.from(entropy, 'hex'));
    return master.derive(`${this.path}${index}`);
  }

  async lock(password: string, options: EncryptOptions) {
    if (this.mnemonic && HDNode.isValidMnemonic(this.mnemonic)) {
      try {
        this.mnemonic = await encryptPhrase(this.mnemonic, password, options);
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('mnemonic is not valid');
    }
  }

  async unlock(password: string) {
    if (this.mnemonic) {
      try {
        this.mnemonic = await decryptPhrase(
          JSON.parse(this.mnemonic),
          password,
        );
      } catch (error) {
        throw error;
      }
    } else {
      throw new Error('mnemonic is not valid');
    }
  }

  get _privateKey() {
    return this.childKey ? this.childKey.privateKey.toString('hex') : '';
  }
  get _publicKey() {
    return this.childKey ? this.childKey.publicKey.toString('hex') : '';
  }
}