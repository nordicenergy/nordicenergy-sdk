/**
 # @harmony-js/network

This package provides a collection of apis to create messengers (HTTP, WebSocket) to connect to blockchain networks.

## Installation

```
npm install @harmony-js/network
```

## Usage

```javascript
const { Messenger, HttpProvider, WSProvider } = require('@harmony-js/network');
const { ChainID, ChainType } = require('@harmony-js/utils');
const testnetHTTP = 'https://api.s0.b.hmny.io';
const testnetWS = 'wss://ws.s0.b.hmny.io';
const localHTTP = 'http://localhost:9500/';
const localWS = 'http://localhost:9800/';
const http = new HttpProvider(testnetHTTP); // for local use localHTTP
const ws = new WSProvider(testnetWS); // for local use testnetWS
const customHTTPMessenger = new Messenger(http, ChainType.NordicEnergy, ChainID.netTestnet); // for local ChainID.NetLocal
const customWSMessenger = new Messenger(ws, ChainType.NordicEnergy, ChainID.netTestnet); // for local ChainID.NetLocal
```
 *
 * @packageDocumentation
 * @module harmony-network
 */

/**@ignore */
export enum RPCMethod {
  // 1. net_getBlockByHash
  GetBlockByHash = 'net_getBlockByHash',
  // 2. net_getBlockByNumber
  GetBlockByNumber = 'net_getBlockByNumber',
  // 3. net_getBlockTransactionCountByHash
  GetBlockTransactionCountByHash = 'net_getBlockTransactionCountByHash',
  // 4. net_getBlockTransactionCountByNumber
  GetBlockTransactionCountByNumber = 'net_getBlockTransactionCountByNumber',
  // 5. net_getCode
  GetCode = 'net_getCode',
  // 6. net_getTransactionByBlockHashAndIndex
  GetTransactionByBlockHashAndIndex = 'net_getTransactionByBlockHashAndIndex',
  // 7. net_getTransactionByBlockNumberAndIndex
  GetTransactionByBlockNumberAndIndex = 'net_getTransactionByBlockNumberAndIndex',
  // 8. net_getTransactionByHash
  GetTransactionByHash = 'net_getTransactionByHash',

  GetTransactionReceipt = 'net_getTransactionReceipt',

  GetCXReceiptByHash = 'net_getCXReceiptByHash',
  // 9. net_syncing
  Syncing = 'net_syncing',
  // 10. net_peerCount
  PeerCount = 'net_peerCount',

  // 11. net_getBalance
  GetBalance = 'net_getBalance',
  // 12. net_getStorageAt
  GetStorageAt = 'net_getStorageAt',
  // 13. net_getTransactionCount
  GetTransactionCount = 'net_getTransactionCount',
  // 14. net_sendTransaction
  SendTransaction = 'net_sendTransaction',
  // 15. net_sendRawTransaction
  SendRawTransaction = 'net_sendRawTransaction',
  // 16. net_subscribe
  Subscribe = 'net_subscribe',
  // 17. net_getlogs
  GetPastLogs = 'net_getLogs',
  // 18. net_getWork
  GetWork = 'net_getWork',
  // 19. net_submitWork
  // SubmitWork = 'net_submitWork',
  // 20. net_getProof
  GetProof = 'net_getProof',
  // 21, net_getFilterChanges
  GetFilterChanges = 'net_getFilterChanges',
  // 22. net_newPendingTransactionFilter
  NewPendingTransactionFilter = 'net_newPendingTransactionFilter',
  // 23. net_newBlockFilter
  NewBlockFilter = 'net_newBlockFilter',
  // 24. net_newFilter
  NewFilter = 'net_newFilter',
  // 25. net_call
  Call = 'net_call',
  // 26. net_estimateGas
  EstimateGas = 'net_estimateGas',
  // 27. net_gasPrice
  GasPrice = 'net_gasPrice',
  // 28. net_blockNumber
  BlockNumber = 'net_blockNumber',
  // 29. net_unsubscribe
  UnSubscribe = 'net_unsubscribe',
  // 30. net_version
  NetVersion = 'net_version',
  // 31. net_protocolVersion
  ProtocolVersion = 'net_protocolVersion',
  // 32. net_getShardingStructure
  GetShardingStructure = 'net_getShardingStructure',
  // 33. net_sendRawStakingTransaction
  SendRawStakingTransaction = 'net_sendRawStakingTransaction',
  // 34. net_getAccountNonce
  GetAccountNonce = 'net_getAccountNonce',
}

/**@ignore */
export enum RPCErrorCode {
  // Standard JSON-RPC 2.0 errors
  // RPC_INVALID_REQUEST is internally mapped to HTTP_BAD_REQUEST (400).
  // It should not be used for application-layer errors.
  RPC_INVALID_REQUEST = -32600,
  // RPC_METHOD_NOT_FOUND is internally mapped to HTTP_NOT_FOUND (404).
  // It should not be used for application-layer errors.
  RPC_METHOD_NOT_FOUND = -32601,
  RPC_INVALID_PARAMS = -32602,
  // RPC_INTERNAL_ERROR should only be used for genuine errors in bitcoind
  // (for example datadir corruption).
  RPC_INTERNAL_ERROR = -32603,
  RPC_PARSE_ERROR = -32700,

  // General application defined errors
  RPC_MISC_ERROR = -1, // std::exception thrown in command handling
  RPC_TYPE_ERROR = -3, // Unexpected type was passed as parameter
  RPC_INVALID_ADDRESS_OR_KEY = -5, // Invalid address or key
  RPC_INVALID_PARAMETER = -8, // Invalid, missing or duplicate parameter
  RPC_DATABASE_ERROR = -20, // Database error
  RPC_DESERIALIZATION_ERROR = -22, // Error parsing or validating structure in raw format
  RPC_VERIFY_ERROR = -25, // General error during transaction or block submission
  RPC_VERIFY_REJECTED = -26, // Transaction or block was rejected by network rules
  RPC_IN_WARMUP = -28, // Client still warming up
  RPC_METHOD_DEPRECATED = -32, // RPC method is deprecated
}
