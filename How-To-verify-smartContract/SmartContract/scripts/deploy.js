const hre = require("hardhat");
// const fs = require('fs');

async function main() {
  const test = await hre.ethers.getContractFactory("HelloWorld")
  const testing = await test.deploy();
  await testing.deployed();
  console.log("smart contract  deployed to:", testing.address);

  // fs.writeFileSync('./config.js', `export const marketplaceAddress = "${nftMarketplace.address}"`)
}

main()
  .then(() => process.exit(0))  
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });


