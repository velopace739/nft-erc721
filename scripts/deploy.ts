import { ethers } from 'hardhat'

async function main() {
  const Velopace = await ethers.getContractFactory("Velopace");
  const [deployer] = await ethers.getSigners();

  const velopace = await Velopace.deploy(deployer.address);
  console.log("Contract deployed to address:", await velopace.getAddress());
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });