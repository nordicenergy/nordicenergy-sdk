# @nordicenergy-js/crypto

This package provides a collection of apis related to address management, kestore, encoding, and encrypt/decrypt.

## Installation

```
npm install @nordicenergy-js/crypto
```

## Usage

```javascript
const {
  encode,
  decode,
  randomBytes,
  toBech32,
  fromBech32,
  NordicEnergyAddress,
  generatePrivateKey,
  getPubkeyFromPrivateKey,
  getAddressFromPublicKey,
  getAddressFromPrivateKey,
  encryptPhrase,
  decryptPhrase
} = require('@nordicenergy-js/crypto');
const { isPrivateKey, isAddress, isPublicKey } = require('@nordicenergy-js/utils');
```

Address apis
```javascript
const bytes = randomBytes(20);
const addr = new NordicEnergyAddress(bytes);

console.log(addr.checksum);
console.log(addr.bech32);

console.log(NordicEnergyAddress.isValidBech32(addr.bech32));
```

RLP apis
```javascript
const encoded = '0x89010101010101010101';
const decoded = '0x010101010101010101';
console.log(encode(decoded));
console.log(decode(encoded));
```

Keystore apis
```javascript
const prv = generatePrivateKey();
const pub = getPubkeyFromPrivateKey(prv);
const addr = getAddressFromPublicKey(pub);
const addrPrv = getAddressFromPrivateKey(prv);
console.log(isPrivateKey(prv));
console.log(isPublicKey(pub));
console.log(isAddress(addr));
console.log(isAddress(addrPrv));
```

Encrypt/decrypt apis
```javascript
const { Wallet } = require('@nordicenergy-js/account');

const myPhrase = new Wallet().newMnemonic();
console.log(myPhrase);
const pwd = '1234';
encryptPhrase(myPhrase, pwd).then((value) => {
  console.log(value);
  decryptPhrase(JSON.parse(value), pwd).then(value => {
    console.log(value);
  });
});
```
