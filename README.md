# Ethereum Wallet Generator

<p align="left">
  <img alt="npm version" src="https://img.shields.io/npm/v/eth-wallet-generator.svg">
  <img alt="license" src="https://img.shields.io/npm/l/eth-wallet-generator.svg">
  <img alt="bun" src="https://img.shields.io/badge/Bun-%23000000.svg?logo=bun&logoColor=white">
</p>

A secure CLI tool for generating Ethereum wallets with BIP-39 mnemonic phrases.

## Features

- BIP-39 compliant 24-word mnemonic generation (256-bit entropy)
- BIP-44 standard derivation path (`m/44'/60'/0'/0/0`)
- Secure, audited cryptographic libraries (@scure/bip39, @scure/bip32)
- Optional password protection (BIP-39 passphrase)
- TypeScript with full type safety
- Built for Bun runtime

## Quick Start

```bash
bunx eth-wallet-generator
```

## Installation

```bash
bun add -g eth-wallet-generator
```

## Usage

```bash
eth-wallet-generator
```

1. Optionally enter a password (BIP-39 passphrase)
2. Your wallet details will be displayed:

```
┌  Your New Wallet
│
│  Address:     0x742d35Cc6634C0532925a3b844Bc9e7595f...
│  Private Key: 0x5081e7a5a1bf99ea3852135561294431eb6...
│  Mnemonic:    abandon abandon abandon abandon abandon ...
│
└  Save your mnemonic and private key securely!
```

## Programmatic Usage

```typescript
import { generateWalletData, isValidMnemonic } from "eth-wallet-generator";

const wallet = generateWalletData({
  password: "optional-passphrase",
  strength: 256, // 24-word mnemonic (default)
  derivationPath: "m/44'/60'/0'/0/0",
});

console.log(wallet.address); // 0x...
console.log(wallet.privateKey); // 0x...
console.log(wallet.mnemonic); // word1 word2 ...

// Validate a mnemonic
console.log(isValidMnemonic(wallet.mnemonic)); // true
```

## Security

This library uses audited cryptographic libraries:

- [@scure/bip39](https://github.com/paulmillr/scure-bip39) - Audited by Cure53
- [@scure/bip32](https://github.com/paulmillr/scure-bip32) - Audited by Cure53
- [viem](https://viem.sh) - Modern Ethereum library

The cryptographic audit was funded by the Ethereum Foundation.

## Development

```bash
# Install dependencies
bun install

# Run in development mode
bun run dev

# Run tests
bun test
```

## License

MIT
