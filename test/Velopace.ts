import { expect } from "chai"
import { loadFixture } from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { ethers } from "hardhat"
import { makeInterfaceId } from "@openzeppelin/test-helpers"

describe("Velopace", () => {
  async function deployVelopace() {
    // Contracts are deployed using the first signer/account by default
    const accounts = await ethers.getSigners();
    const [deployer] = accounts;

    const Contract = await ethers.getContractFactory("Velopace");
    const contract = await Contract.deploy(deployer.address);
    await contract.deployed();

    return {
      contract,
      deployer: deployer,
      accounts,
      contractConstructor: {
        name: "Velopace",
        symbol: "VA",
        owner: deployer,
      },
    }
  }

  it("Should Return Valid Contract Configurations Passed In Constructor", async () => {
    const { contractConstructor, contract } = await loadFixture(deployVelopace)

    expect(await contract.name).to.equal(contractConstructor.name)
    expect(await contract.symbol).to.equal(contractConstructor.symbol)
    expect(await contract.owner).to.equal(contractConstructor.owner)
  })

  describe("Minting Functionality", () => {
    it("Should Increase Total Supply When Minting", async () => {
      const { contract, deployer } = await loadFixture(deployVelopace)

      expect(await contract.totalSupply()).to.equal(0)

      await contract.safeMint(deployer, 'ipfs://uri-1')

      await contract.safeMint(deployer, 'ipfs://uri-2')

      await contract.safeMint(deployer, 'ipfs://uri-3')

      expect(await contract.totalSupply()).to.equal(3)
    })

    it("Should Mint Tokens With Correct Token IDs", async () => {
      const { contract, accounts } = await loadFixture(deployVelopace)

      await contract.safeMint(accounts[1], 'token uri 1')

      await contract.safeMint(accounts[2], 'token uri 2')

      await contract.safeMint(accounts[3], 'token uri 3')

      expect(await contract.ownerOf(0)).to.equal(accounts[1])
      expect(await contract.ownerOf(1)).to.equal(accounts[2])
      expect(await contract.ownerOf(2)).to.equal(accounts[3])
    })

    it("Should Allow Minting Only to Contract Owner", async () => {
      const { contract, accounts } = await loadFixture(deployVelopace)

      await expect(contract.connect(accounts[1]).safeMint(accounts[1], 'token uri'))
        .to.be.revertedWithCustomError(contract, "OwnableUnauthorizedAccount")
        .withArgs(accounts[1].address)
    })
  })

  describe("Contract And Token Metadata", () => {
    it("Should Return Correct Token URI", async () => {
      const { contract, accounts } = await loadFixture(deployVelopace)

      const tokenURI = 'token uri';
      await contract.safeMint(await accounts[1].address, tokenURI)

      expect(await contract.tokenURI(0)).to.equal(tokenURI)
    })

    it("Should Return Correct Token URI", async () => {
      const { contract } = await loadFixture(deployVelopace)

      await expect(contract.tokenURI(1))
        .to.be.revertedWithCustomError(contract, "ERC721NonexistentToken")
        .withArgs(1)
    })
  })

  describe("InterfaceId", () => {
    it("Should Validate IERC721", async () => {
      const { contract } = await loadFixture(deployVelopace)

      const erc721InterfaceId = makeInterfaceId.ERC165([
        "balanceOf(address)",
        "ownerOf(uint256)",
        "safeTransferFrom(address,address,uint256)",
        "transferFrom(address,address,uint256)",
        "approve(address,uint256)",
        "getApproved(uint256)",
        "setApprovalForAll(address,bool)",
        "isApprovedForAll(address,address)",
        "safeTransferFrom(address,address,uint256,bytes)",
      ])

      expect(await contract.supportsInterface(erc721InterfaceId)).to.equal(true)
    })

    it("Should Validate IERC721Enumerable", async () => {
      const { contract } = await loadFixture(deployVelopace)

      const erc721EnumerableInterfaceId = makeInterfaceId.ERC165([
        "totalSupply()",
        "tokenOfOwnerByIndex(address,uint256)",
        "tokenByIndex(uint256)",
      ])

      expect(await contract.supportsInterface(erc721EnumerableInterfaceId)).to.equal(true)
    })
  })
})