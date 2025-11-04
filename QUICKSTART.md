# 🚀 Quick Start Guide

Get Crypto Confessions running in 5 minutes.

## Prerequisites

- Node.js 18+ installed
- A Web3 wallet (MetaMask recommended)
- Base Sepolia ETH ([get free testnet ETH](https://www.coinbase.com/faucets/base-ethereum-sepolia-faucet))

## Installation

```bash
# 1. Install dependencies
npm install

# 2. Set up environment variables
cp .env.example .env.local

# 3. (Optional) Get a WalletConnect Project ID
# Visit https://cloud.walletconnect.com and create a project
# Add the project ID to .env.local

# 4. Start the development server
npm run dev
```

Visit **http://localhost:3000** 🎉

## Deploy Contract (Optional)

To interact with the full functionality, deploy the smart contract:

```bash
# 1. Add your private key to .env.local
PRIVATE_KEY=your_private_key_here

# 2. Compile contracts
npm run compile

# 3. Deploy to Base Sepolia
npm run deploy

# 4. Copy the contract address and update .env.local
NEXT_PUBLIC_CONTRACT_ADDRESS=0xYourDeployedAddress
```

## Features to Try

1. **Connect Wallet** - Click "Connect Wallet" in the top right
2. **Post a Confession** - Navigate to "Confess" and share a secret
3. **View Feed** - See encrypted confessions on the home page
4. **Privacy Dashboard** - Check out encrypted analytics

## Production Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Add environment variables in Vercel dashboard
# Then deploy to production
vercel --prod
```

### Switch to Base Mainnet

Update `.env.local`:

```env
NEXT_PUBLIC_CHAIN_ID=8453
NEXT_PUBLIC_RPC_URL=https://mainnet.base.org
```

Deploy contract to mainnet:

```bash
npx hardhat run scripts/deploy.ts --network baseMainnet
```

## Troubleshooting

### Port 3000 already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

### Wallet not connecting

- Make sure you're on Base Sepolia network
- Try refreshing the page
- Clear browser cache

### Contract read/write errors

- Ensure contract is deployed
- Check that contract address in `.env.local` is correct
- Verify you have testnet ETH

## Get Help

- Check the [full README](README.md)
- Open an issue on GitHub
- Join our community Discord

---

**Built with ❤️ by xtestnet**
