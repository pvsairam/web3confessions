# 🔐 Crypto Confessions

> _"Your secrets, encrypted forever on Base. Whispered to the blockchain, heard by none."_

A privacy-preserving anonymous confession platform built with **Fully Homomorphic Encryption (FHE)** on **Base** blockchain, designed as a **Farcaster Mini App**.

---

## ✨ The Vision

In a world where data is constantly surveilled, **Crypto Confessions** offers a sanctuary for your thoughts. Every confession is:

- 🔒 **Encrypted on your device** before touching the blockchain
- 🌐 **Stored permanently** on Base, immutable and uncensorable
- 👁️ **Readable only by you** - not even the contract can decrypt your secrets
- 🧮 **Computed under encryption** - aggregations without revealing plaintext

Built with the philosophy that **privacy is a fundamental human right**, not a privilege.

---

## 🎨 Design Philosophy

This app embodies **poetic minimalism** - where every pixel serves a purpose, every animation tells a story:

- **Glassmorphism surfaces** that float like thoughts in the void
- **Cosmic gradients** representing the encrypted digital universe
- **Serif typography** for emotional depth, monospace for technical truth
- **Micro-interactions** that reward curiosity and delight the user

> _"Design is not just what it looks like. Design is how it works."_ - Steve Jobs

---

## 🚀 Features

### For Users

- **📝 Anonymous Confessions**: Share secrets without revealing identity
- **🔐 End-to-End Encryption**: Client-side encryption using Zama FHEVM
- **💬 Encrypted Reactions**: React and upvote without compromising privacy
- **📊 Privacy Dashboard**: View aggregated metrics computed under encryption
- **🌉 Base Integration**: Fast, low-cost transactions on Ethereum L2
- **🎭 Farcaster Compatible**: Works as a Farcaster Frame

### For Developers

- **Next.js 15** with App Router and React 19
- **TypeScript** for type safety
- **Tailwind CSS** with custom design system
- **Framer Motion** for buttery-smooth animations
- **wagmi + viem** for Ethereum interactions
- **RainbowKit** for beautiful wallet connections
- **Hardhat** for smart contract development

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS, Framer Motion |
| Web3 | wagmi, viem, RainbowKit |
| Encryption | Zama FHEVM SDK |
| Blockchain | Base Sepolia (testnet), Base (mainnet) |
| Smart Contracts | Solidity 0.8.24, Hardhat |
| Social | Farcaster Frames API |

---

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- A Web3 wallet (MetaMask, Coinbase Wallet, etc.)
- Some Base Sepolia ETH for testing ([get from faucet](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))

### Setup

1. **Clone the repository**

```bash
git clone https://github.com/yourusername/crypto-confessions.git
cd crypto-confessions
```

2. **Install dependencies**

```bash
npm install
```

3. **Configure environment variables**

Create a `.env.local` file:

```env
NEXT_PUBLIC_CHAIN_ID=84532
NEXT_PUBLIC_RPC_URL=https://base-sepolia.blockpi.network/v1/rpc/public
NEXT_PUBLIC_CONTRACT_ADDRESS=
NEXT_PUBLIC_APP_NAME=Crypto Confessions
NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID=

# For deployment only (keep private!)
PRIVATE_KEY=
```

4. **Deploy the smart contract**

```bash
# Compile contracts
npm run compile

# Deploy to Base Sepolia
npm run deploy
```

Copy the deployed contract address and update `NEXT_PUBLIC_CONTRACT_ADDRESS` in `.env.local`.

5. **Run the development server**

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) 🎉

---

## 🔐 How FHE Works

**Fully Homomorphic Encryption (FHE)** is cryptographic magic that allows:

1. **Client-side encryption**: Your confession is encrypted on your device
2. **On-chain computation**: Smart contracts can perform operations on encrypted data
3. **No decryption needed**: Aggregations happen without revealing plaintext
4. **Owner-only access**: Only you can decrypt your own confessions

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Your      │      │  Blockchain  │      │   Other     │
│   Device    │──────│  (Base)      │──────│   Users     │
│             │      │              │      │             │
│ Plaintext   │      │ Ciphertext   │      │ Can't Read  │
│ + Encrypt   │      │ Stored       │      │ (Encrypted) │
│ = Send      │      │ Forever      │      │             │
└─────────────┘      └──────────────┘      └─────────────┘
```

---

## 🌐 Deploy to Production

### Switch to Base Mainnet

1. Update `.env.local`:

```env
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

2. Deploy contract to mainnet:

```bash
npx hardhat run scripts/deploy.ts --network baseMainnet
```

3. Update contract address and deploy frontend to Vercel:

```bash
vercel deploy --prod
```

---

## 🎭 Farcaster Integration

This app works as a **Farcaster Frame**. The Frame metadata endpoint is at `/api/frame`.

To integrate:

1. Deploy your app to a public URL
2. Update `NEXT_PUBLIC_APP_URL` in `.env.local`
3. Share your app URL on Warpcast - it will render as a Frame!

---

## 🏗️ Project Structure

```
crypto-confessions/
├── app/
│   ├── page.tsx           # Home page with feed
│   ├── confess/           # Confession composer
│   ├── privacy/           # Privacy dashboard
│   ├── api/frame/         # Farcaster Frame endpoint
│   ├── layout.tsx         # Root layout
│   ├── providers.tsx      # Web3 providers
│   └── globals.css        # Global styles
├── components/
│   ├── Button.tsx         # Glass button component
│   ├── GlassCard.tsx      # Glassmorphic card
│   ├── Input.tsx          # Styled input
│   ├── Navigation.tsx     # App navigation
│   ├── Footer.tsx         # Footer with credits
│   └── EncryptedBadge.tsx # Encryption indicator
├── lib/
│   ├── fhe.ts             # FHE encryption utilities
│   ├── contract.ts        # Contract ABI and types
│   └── wagmi.ts           # Web3 config
├── contracts/
│   └── CryptoConfessions.sol  # Smart contract
├── scripts/
│   └── deploy.ts          # Deployment script
└── hardhat.config.ts      # Hardhat configuration
```

---

## 🎨 Design System

### Colors

- **Void**: `#0b0d12` to `#111827` - Deep cosmic backgrounds
- **Base Blue**: `#0052FF` - Primary brand color
- **Cyan**: `#00E0FF` - Digital whispers and accents
- **Glass**: `rgba(255,255,255,0.1)` - Translucent surfaces

### Typography

- **Display**: Playfair Display (serif) - For poetic headings
- **Body**: Inter (sans-serif) - Clean, readable text
- **Mono**: Roboto Mono - For ciphertexts and code

### Animations

- **Float**: Gentle vertical motion
- **Glow**: Pulsing cipher effects
- **Bubble**: Upward emergence animation
- **Shimmer**: Gradient text animation

---

## 🤝 Contributing

We welcome contributions! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 🔒 Security

- **Never commit your private key** - it's in `.gitignore` for a reason
- **Audit smart contracts** before deploying to mainnet
- **Use hardware wallets** for production deployments
- **Test thoroughly** on Base Sepolia before mainnet

---

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details.

---

## 💝 Credits

**Built with ❤️ by [xtestnet](https://twitter.com/xtestnet)**

Powered by:
- [Zama FHEVM](https://www.zama.ai/) - Fully Homomorphic Encryption
- [Base](https://base.org/) - Ethereum L2
- [Farcaster](https://www.farcaster.xyz/) - Decentralized social protocol
- [RainbowKit](https://www.rainbowkit.com/) - Wallet connection UI
- [Framer Motion](https://www.framer.com/motion/) - Animation library

---

## 🌟 Star History

If this project inspired you, please give it a ⭐ on GitHub!

---

_"In code we trust, in encryption we confess."_ 🔐

