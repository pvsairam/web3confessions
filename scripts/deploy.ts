import { ethers } from 'hardhat';

async function main() {
  console.log('🚀 Deploying CryptoConfessions to Base Sepolia...\n');

  const [deployer] = await ethers.getSigners();
  console.log('📝 Deploying with account:', deployer.address);

  const balance = await ethers.provider.getBalance(deployer.address);
  console.log('💰 Account balance:', ethers.formatEther(balance), 'ETH\n');

  // Deploy the contract
  console.log('⚙️  Deploying contract...');
  const CryptoConfessions = await ethers.getContractFactory('CryptoConfessions');
  const contract = await CryptoConfessions.deploy();

  await contract.waitForDeployment();

  const address = await contract.getAddress();
  console.log('✅ CryptoConfessions deployed to:', address);

  console.log('\n📋 Next steps:');
  console.log('1. Update NEXT_PUBLIC_CONTRACT_ADDRESS in .env.local:');
  console.log(`   NEXT_PUBLIC_CONTRACT_ADDRESS=${address}`);
  console.log('\n2. Verify contract on Basescan (optional):');
  console.log(`   npx hardhat verify --network baseSepolia ${address}`);
  console.log('\n3. Start your Next.js app:');
  console.log('   npm run dev');

  console.log('\n🎉 Deployment complete!\n');
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
