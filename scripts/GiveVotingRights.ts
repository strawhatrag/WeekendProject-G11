import {
  createPublicClient,
  http,
  createWalletClient,
  formatEther,
  toHex,
  hexToString,
} from "viem";
import { abi, bytecode } from "../artifacts/contracts/Ballot.sol/Ballot.json";
import { privateKeyToAccount } from "viem/accounts";
import { sepolia } from "viem/chains";
import * as dotenv from "dotenv";

dotenv.config();

const deployerPrivateKey = process.env.PRIVATE_KEY || "";
const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const account = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const deployer = createWalletClient({
    account,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const parameters = process.argv.slice(2);
  if (parameters.length < 2) {
    throw new Error(
      "Usage: ts-node script.ts <contractAddress> <voterAddress1> <voterAddress2> ..."
    );
  }

  const contractAddress = parameters[0] as `0x${string}`;
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress)) {
    throw new Error("Invalid contract address");
  }

  const voterAddresses = parameters.slice(1);

  // Give voting rights to specific addresses
  for (const voterAddress of voterAddresses) {
    const tx = await deployer.writeContract({
      address: contractAddress,
      abi,
      functionName: "giveRightToVote",
      args: [voterAddress],
    });
    console.log(`Gave voting rights to ${voterAddress}. Transaction: ${tx}`);
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/* run this :
 npx ts-node --files ./scripts/GiveVotingRights.ts <contractAddress> <voterAddress1> <voterAddress2> */
