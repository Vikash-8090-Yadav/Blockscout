
require ('@nomiclabs/hardhat-waffle');
require('@nomiclabs/hardhat-etherscan');


task("accounts","Prints the list of the accounts",async (taskArgs , hre )=>{
  const accounts = await hre.ethers.getSigners();

  for(const account of accounts){
    console.log(account.address);
  }
})

module.exports = {
  solidity: "0.8.24",

  defaultNetwork: "optimism-sepolia",
  networks:{
    hardhat:{},
    'optimism-sepolia': {
      url: 'https://sepolia.optimism.io',
      accounts: ['5753e65f56865a161fbf41932a0d855139a4ce9dc20d82fb655bff393fc41702'],
    },
  },
  etherscan: {
    apiKey: {
      // Is not required by blockscout. Can be any non-empty string
      'optimism-sepolia': "abc"
    },
    customChains: [
      {
        network: "optimism-sepolia",
        chainId: 11155420,
        urls: {
          apiURL: "https://optimism-sepolia.blockscout.com/api",
          browserURL: "https://optimism-sepolia.blockscout.com/",
        }
      }
    ]
  },
  sourcify: {
    enabled: false
  }
};

