import { expect } from "chai";
import { viem } from "hardhat";
import { loadFixture } from "@nomicfoundation/hardhat-toolbox-viem/network-helpers";

describe("HelloWorld", function () {
  async function deployContractFixture() {
    const publicClient = await viem.getPublicClient();
    const [owner, otherAccount] = await viem.getWalletClients();
    const helloWorldContract = await viem.deployContract("HelloWorld");
    return {
      publicClient,
      owner,
      otherAccount,
      helloWorldContract,
    };
  }

  it("Should give a Hello World", async () => {
    const { helloWorldContract } = await loadFixture(deployContractFixture);
    const helloWorldText = await helloWorldContract.read.helloWorld();
    expect(helloWorldText).to.eq("Hello World");
  });
});
