# Ethereum Wallet Generator

<p align="left">
  <img alt="license" src="https://img.shields.io/npm/l/eth-wallet-generator.svg">
  <img alt="bun" src="https://img.shields.io/badge/Bun-1.0+-black?logo=bun&logoColor=white">
  <img alt="typescript" src="https://img.shields.io/badge/TypeScript-5.0+-blue?logo=typescript&logoColor=white">
</p>

Generate secure Ethereum wallets from your terminal. Fast. Simple. Audited.

## Why This?

- **Blazing fast** - Built on Bun, installs in milliseconds
- **Battle-tested crypto** - Uses `@scure/bip39` & `@scure/bip32`, audited by Cure53
- **Privacy first** - Secrets hidden by default, reveal only when needed
- **Zero config** - Just run it

## Quick Start

```bash
bunx eth-wallet-generator
```

That's it. You now have a wallet.

## What You Get

```
┌  Ethereum Wallet Generator
│
◆  Enter a password to encrypt your wallet (optional):
│  ****
└

┌  Your New Wallet
│
│  Address:     0x742d35Cc6634C0532925a3b844Bc454f23412...
│
│  Private Key: ••••••••••••••••••••••••••••••••••••••••
│
│  Mnemonic:    ••••••••••••••••••••••••••••••••••••••••
│
└

◆  What would you like to do?
│  ○ Show Private Key
│  ○ Show Mnemonic
│  ○ Copy Private Key
│  ○ Copy Mnemonic
│  ○ Copy Address
│  ○ Exit
└
```

Secrets stay hidden. Reveal them when ready. Copy to clipboard with one keystroke.

## Install Globally

```bash
bun add -g eth-wallet-generator
```

Then just run:

```bash
eth-wallet-generator
```

## Use in Code

```typescript
import { generateWalletData, isValidMnemonic } from "eth-wallet-generator";

const wallet = generateWalletData({
  password: "optional-passphrase",  // BIP-39 passphrase
  strength: 256,                     // 24 words (default)
});

console.log(wallet.address);    // 0x...
console.log(wallet.privateKey); // 0x...
console.log(wallet.mnemonic);   // 24 words

isValidMnemonic(wallet.mnemonic); // true
```

## Tech Stack

| What | Why |
|------|-----|
| [Bun](https://bun.sh) | 10x faster than Node |
| [viem](https://viem.sh) | Modern Ethereum library |
| [@scure/bip39](https://github.com/paulmillr/scure-bip39) | Audited mnemonic generation |
| [@scure/bip32](https://github.com/paulmillr/scure-bip32) | Audited HD key derivation |
| [@clack/prompts](https://github.com/bombshell-dev/clack) | Beautiful CLI prompts |
| [picocolors](https://github.com/alexeyraspopov/picocolors) | Tiny, fast terminal colors |

All crypto libraries are **audited by Cure53** and funded by the **Ethereum Foundation**.

## Security

- BIP-39 compliant (24-word mnemonic, 256-bit entropy)
- BIP-44 derivation path (`m/44'/60'/0'/0/0`)
- Secrets hidden by default in CLI
- No network requests, everything runs locally

## Development

```bash
bun install     # Install deps
bun run start   # Run CLI
bun run dev     # Watch mode
```

## License

MIT
