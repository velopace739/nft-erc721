import { ethers } from "hardhat";
import contract from "../artifacts/contracts/Velopace.sol/Velopace.json";

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY!;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;
const SAMPLE_NFT_OWNER = process.env.SAMPLE_NFT_OWNER;
const SAMPLE_NFT_URI = process.env.SAMPLE_NFT_URI;

// Provider
const alchemyProvider = new ethers.JsonRpcProvider(API_URL);

// Signer
const signer = new ethers.Wallet(PRIVATE_KEY, alchemyProvider);

// Contract
const velopaceContract = new ethers.Contract(CONTRACT_ADDRESS, contract.abi, signer);

async function main() {
  console.log("Minting NFT...");
  const tx = await velopaceContract.safeMint(SAMPLE_NFT_OWNER, SAMPLE_NFT_URI);
  await tx.wait();

  const totalSupply = await velopaceContract.totalSupply();
  console.log(`The total supply is: ${totalSupply}`);

  const tokenId = 0;
  const uri = await velopaceContract.tokenURI(tokenId);
  console.log(`The URI for token id ${tokenId}: ${uri}`);
}

main();