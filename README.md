# Nordic Energy JavaScript SDK

[![npm version](https://img.shields.io/npm/v/@nordicenergy-js/core.svg?style=flat-square)](https://www.npmjs.com/package/@nordicenergy-js/core)
[![Build Status](https://travis-ci.com/FireStack-Lab/nordicenergy-sdk-core.svg?branch=master)](https://travis-ci.com/FireStack-Lab/nordicenergy-sdk-core)

This is the Nordic Energy Javascript SDK which provides an easier way to interact with Nordic Energy blockchain.

Please read the [documentation](https://sdk.doc.nordicenergy.io/) for full API doc.

The SDK includes following packages with package-level documentation and examples inside each package.

1. [@nordicenergy-js/core](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-core)
2. [@nordicenergy-js/account](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-account)
3. [@nordicenergy-js/crypto](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-crypto)
4. [@nordicenergy-js/network](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-network)
5. [@nordicenergy-js/utils](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-utils)
6. [@nordicenergy-js/transaction](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-transaction)
7. [@nordicenergy-js/contract](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-contract)
8. [@nordicenergy-js/staking](https://github.com/nordicenergy/sdk/tree/master/packages/nordicenergy-contract)

# Examples

* [A Token Faucet Demo DApp](https://github.com/nordicenergy/token-faucet-demo-dapp)
* [Hackathon DApps](https://docs.nordicenergy.io/home/showcases/applications): DApps built during our internal hackathon
  * [soccerplayers](https://github.com/gupadhyaya/soccerplayers), [netmoji](https://github.com/peekpi/netmoji), [harmonauts](https://github.com/ivorytowerdds/harmonauts), [good-net](https://github.com/nordicenergy/dapp-demo-crowdfunding)
* [Cross-chain Apps](https://docs.nordicenergy.io/home/showcases/crosschain) [the link contains code, demo, and more information]
* [DeFi Apps](https://docs.nordicenergy.io/home/showcases/defi)
* [DevPost Hackathon Apps](https://docs.nordicenergy.io/home/showcases/hackathons)
* Eth<>Nordic Energy Bridge Compnetnts: [frontend](https://github.com/nordicenergy/ethnet-bridge.frontend), [backend](https://github.com/nordicenergy/ethnet-bridge.appengine), [smart contracts](https://github.com/nordicenergy/ethnet-bridge), [test scripts](https://github.com/nordicenergy/ethnet-bridge.tests)
* Eth<>nordicenergy bridge SDKs: [main sdk](https://github.com/nordicenergy/ethnet-bridge.sdk), [bridge UI widget](https://github.com/nordicenergy/ethnet-bridge.ui-sdk)
* Swoop Dex: [interface](https://github.com/nordicenergy/swoop-interface), [cli](https://github.com/nordicenergy/swoop-cli), [sdk](https://github.com/nordicenergy/swoop-sdk), [deployment](https://github.com/nordicenergy/swoop-deployment), [misc](https://github.com/nordicenergy/swoop-misc), [lib](https://github.com/nordicenergy/swoop-lib), [periphery](https://github.com/nordicenergy/swoop-periphery), [core](https://github.com/nordicenergy/swoop-core), [testing](https://github.com/nordicenergy/swoop-testing), [utils](https://github.com/nordicenergy/swoop-utils)
* [Iris Bridge](https://github.com/nordicenergy/ethnet-bridge-v2): inspired from near's rainbow bridge
* [Animoca's BeastQuest Game](https://github.com/nordicenergy/BeastQuest)
* [Chainlink Testnet Integration Demo](https://github.com/nordicenergy/chainlink-demo-project)
* [NFT Store DApp](https://github.com/nordicenergy/nft-store)
* [old dapp-examples](https://github.com/nordicenergy/dapp-examples): some of them may be outdated!


# Installation

This library works on both nodejs and browser. Please use it according to your use case.

## Enviorment requirement

* Nodejs: 10.0+
* Browser: Latest Chrome and Firefox

## Install from npm/yarn

**Note: we added a @next tag to npm package, please use the following command to install with npm/yarn**

```bash

# npm
npm install @nordicenergy-js/core@next 

# yarn
yarn add @nordicenergy-js/core@next

# tslib is required, we'd better install it as well
npm install tslib
yarn add tslib

```

# Building from source files

## Install `lerna` and `typescript` globally

```bash
yarn global add lerna && yarn global add typescript
```
## Bootstrap and build

```bash
yarn bootstrap
```

## Bundle

Build `umd` and `esm` version javascript for each sub-packages, which can be accessed by `import` or `require`

```bash 
yarn dist
```
All files are exported in `packages/dist` folder, use `**.esm.js` or `**.umd.js` format


# Running Tests
## Unit tests
```bash
yarn test:src
```
## e2e tests

1. `.env` file defines configuration, edit if you have custom settings
   
2. Run nordicenergy node locally, follow the instructions: https://github.com/nordicenergy/nordicenergy-sdk
   
3. Wait for 1-2 mins, and run this:

```bash
yarn build && yarn test:e2e
```




