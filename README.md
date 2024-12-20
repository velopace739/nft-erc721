# BuyMeACoffee solidity contract

This repo contains a contract that implements tipping functionality.

Install dependencies with `yarn`.

Set up by creating a `.env` file, and filling out these variables:

```
API_URL=your Alchemy RPC URL
PRIVATE_KEY=your wallet private key
BSCSCAN_API_KEY=your bscscan api key
CONTRACT_ADDRESS=deployed contract address
```

You can get an Alchemy RPC URL for free [here](https://dashboard.alchemy.com/).

## !!! Be very careful with exporting your private key !!!

You can get your Private Key from MetaMask [like this](https://metamask.zendesk.com/hc/en-us/articles/360015289632-How-to-Export-an-Account-Private-Key).
If you have any questions or concerns about this, please find someone you trust to sanity check you! 

## !!! Be very careful with exporting your private key !!!

Deploy your contract with:

```
npx hardhat run .\scripts\deploy.ts --network bsc_testnet
```
Verify your contract with:
```
npx hardhat verify --network bsc_testnet CONTRACT_ADDRESS DEPLOYER_ADDRESS
```

Run an example safe mint token with:

```
npx hardhat run .\scripts\interact.ts --network bsc_testnet
```
## Contract Address
BSC testnet: [0xEab468eecba2a5FA12213668eB12079d6ecdEcE6](https://testnet.bscscan.com/address/0xEab468eecba2a5FA12213668eB12079d6ecdEcE6#code)
