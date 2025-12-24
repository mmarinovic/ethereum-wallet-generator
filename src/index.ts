#!/usr/bin/env bun
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "@scure/bip39";
import { wordlist } from "@scure/bip39/wordlists/english";
import { HDKey } from "@scure/bip32";
import { privateKeyToAccount } from "viem/accounts";
import * as p from "@clack/prompts";
import pc from "picocolors";

// Types
export interface WalletData {
  address: `0x${string}`;
  privateKey: `0x${string}`;
  mnemonic: string;
}

export interface WalletGeneratorOptions {
  password?: string;
  strength?: 128 | 160 | 192 | 224 | 256;
  derivationPath?: string;
}

const DEFAULT_PATH = "m/44'/60'/0'/0/0";
const DEFAULT_STRENGTH = 256;

export function generateWalletData(options: WalletGeneratorOptions = {}): WalletData {
  const { strength = DEFAULT_STRENGTH, derivationPath = DEFAULT_PATH } = options;

  const mnemonic = generateMnemonic(wordlist, strength);
  const seed = mnemonicToSeedSync(mnemonic, options.password);
  const hdKey = HDKey.fromMasterSeed(seed);
  const derived = hdKey.derive(derivationPath);

  if (!derived.privateKey) {
    throw new Error("Failed to derive private key");
  }

  const privateKey = `0x${Buffer.from(derived.privateKey).toString("hex")}` as `0x${string}`;
  const account = privateKeyToAccount(privateKey);

  return {
    address: account.address,
    privateKey,
    mnemonic,
  };
}

export function isValidMnemonic(mnemonic: string): boolean {
  return validateMnemonic(mnemonic, wordlist);
}

// Clipboard helper
async function copyToClipboard(text: string): Promise<boolean> {
  try {
    const proc = Bun.spawn(["pbcopy"], { stdin: "pipe" });
    proc.stdin.write(text);
    proc.stdin.end();
    await proc.exited;
    return true;
  } catch {
    // Fallback for Linux
    try {
      const proc = Bun.spawn(["xclip", "-selection", "clipboard"], { stdin: "pipe" });
      proc.stdin.write(text);
      proc.stdin.end();
      await proc.exited;
      return true;
    } catch {
      return false;
    }
  }
}

async function main(): Promise<void> {
  p.intro(pc.cyan("Ethereum Wallet Generator"));

  const password = await p.password({
    message: "Enter a password to encrypt your wallet (optional):",
  });

  if (p.isCancel(password)) {
    p.cancel("Operation cancelled.");
    process.exit(0);
  }

  const wallet = generateWalletData({ password: password || "" });

  let showPrivateKey = false;
  let showMnemonic = false;

  const displayWallet = () => {
    const hiddenKey = "••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••••";
    const hiddenMnemonic = "•".repeat(wallet.mnemonic.length);

    console.clear();
    p.intro(pc.cyan("Ethereum Wallet Generator"));
    p.note(
      [
        `${pc.blue("Address:")}     ${wallet.address}`,
        "",
        `${pc.magenta("Private Key:")} ${showPrivateKey ? wallet.privateKey : hiddenKey}`,
        "",
        `${pc.cyan("Mnemonic:")}    ${showMnemonic ? wallet.mnemonic : hiddenMnemonic}`,
      ].join("\n"),
      "Your New Wallet"
    );
  };

  while (true) {
    displayWallet();

    const action = await p.select({
      message: "What would you like to do?",
      options: [
        { value: "toggle_key", label: showPrivateKey ? "Hide Private Key" : "Show Private Key" },
        { value: "toggle_mnemonic", label: showMnemonic ? "Hide Mnemonic" : "Show Mnemonic" },
        { value: "copy_key", label: "Copy Private Key" },
        { value: "copy_mnemonic", label: "Copy Mnemonic" },
        { value: "copy_address", label: "Copy Address" },
        { value: "exit", label: pc.yellow("Exit") },
      ],
    });

    if (p.isCancel(action) || action === "exit") {
      p.outro(pc.yellow("Save your mnemonic and private key securely!"));
      break;
    }

    switch (action) {
      case "toggle_key":
        showPrivateKey = !showPrivateKey;
        break;
      case "toggle_mnemonic":
        showMnemonic = !showMnemonic;
        break;
      case "copy_key":
        if (await copyToClipboard(wallet.privateKey)) {
          p.log.success("Private key copied to clipboard!");
          await Bun.sleep(1000);
        } else {
          p.log.error("Failed to copy. Please copy manually.");
          await Bun.sleep(1500);
        }
        break;
      case "copy_mnemonic":
        if (await copyToClipboard(wallet.mnemonic)) {
          p.log.success("Mnemonic copied to clipboard!");
          await Bun.sleep(1000);
        } else {
          p.log.error("Failed to copy. Please copy manually.");
          await Bun.sleep(1500);
        }
        break;
      case "copy_address":
        if (await copyToClipboard(wallet.address)) {
          p.log.success("Address copied to clipboard!");
          await Bun.sleep(1000);
        } else {
          p.log.error("Failed to copy. Please copy manually.");
          await Bun.sleep(1500);
        }
        break;
    }
  }
}

if (import.meta.main) {
  main();
}
