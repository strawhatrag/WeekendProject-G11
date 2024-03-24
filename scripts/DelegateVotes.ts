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

const deployerPrivateKey = process.env.PRIVATE_KEY2 || "";
const providerApiKey = process.env.ALCHEMY_API_KEY || "";

async function main() {
  const publicClient = createPublicClient({
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const deployerAccount = privateKeyToAccount(`0x${deployerPrivateKey}`);
  const deployer = createWalletClient({
    account: deployerAccount,
    chain: sepolia,
    transport: http(`https://eth-sepolia.g.alchemy.com/v2/${providerApiKey}`),
  });

  const parameters = process.argv.slice(2);
  if (!parameters || parameters.length < 2)
    throw new Error("Parameters not provided");
  const contractAddress = parameters[0] as `0x${string}`;
  if (!contractAddress) throw new Error("Contract address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(contractAddress))
    throw new Error("Invalid contract address");
  const delegateAddress = parameters[1] as `0x${string}`;
  if (!delegateAddress) throw new Error("Delegate address not provided");
  if (!/^0x[a-fA-F0-9]{40}$/.test(delegateAddress))
    throw new Error("Invalid delegate address");

  const tx = await deployer.writeContract({
    address: contractAddress,
    abi,
    functionName: "delegate",
    args: [delegateAddress],
  });
  console.log(`Delegated vote to ${delegateAddress}. Transaction: ${tx}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

/*
npx ts-node --files ./scripts/DelegateVotes.ts 0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83 0x239Cc31D5e1225e90AD6BD561aE89772660C557c 

*/
