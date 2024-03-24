# Smart Contract Voting System

This project demonstrates a smart contract voting system on the Ethereum blockchain. It includes scripts for deploying the contract, interacting with it, and querying its results.

Try running some of the following tasks:

```shell
# Deploy the voting smart contract with specified proposals
npx ts-node --files ./scripts/DeployWithViem.ts "cake" "icecream" "icecream cake"

# Cast a vote for a specific proposal index
npx ts-node --files ./scripts/CastVote.ts <contract_address> <proposal_index>

# Give voting rights to specific Ethereum addresses
npx ts-node --files ./scripts/GiveVotingRights.ts <contract_address> <voter_address_1> <voter_address_2> ...

# Delegate voting rights to another Ethereum address
npx ts-node --files ./scripts/DelegateVotes.ts <contract_address> <delegate_address>

# Query the winning proposal from the deployed smart contract
npx ts-node --files ./scripts/QueryResults.ts <contract_address>

```
# Contract deployed
https://sepolia.etherscan.io/address/0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83
![transactions](https://ibb.co/RpBRLTt)


# OutPut 
```
❯ npx ts-node --files ./scripts/DeployWithViem.ts "cake" "icecream" "icecream cake"
Last block number: 5550590n
Deployer address: 0x239Cc31D5e1225e90AD6BD561aE89772660C557c
Deployer balance: 1.678182369706780018 SEP

Deploying Ballot contract
Transaction hash: 0xcc1b35b3dc3907d49acbdb61f46d061c29e7de704e95ceff32fefcaa43ff49f5
Waiting for confirmations...
Ballot contract deployed to: 0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83
Proposals: 
{
  index: 0,
  name: 'cake',
  proposal: [
    '0x63616b6500000000000000000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 1,
  name: 'icecream',
  proposal: [
    '0x696365637265616d000000000000000000000000000000000000000000000000',
    0n
  ]
}
{
  index: 2,
  name: 'icecream cake',
  proposal: [
    '0x696365637265616d2063616b6500000000000000000000000000000000000000',
    0n
  ]
}

// cast vote
at  ~/project is 📦 v1.0.0 took 24s 
❯ npx ts-node --files ./scripts/CastVote.ts 0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83 1
Proposal selected: 
Voting to proposal icecream
Confirm? (Y/n)
y
Transaction hash: 0x9a8a996e82887139619dd569981b1c3dd9b94d39d87ec242ec25dfb80ec2849a
Waiting for confirmations...
Transaction confirmed

// give right to vote

npx ts-node --files ./scripts/GiveVotingRights.ts 0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83 0x6cc80141Ae47922748C559D4bd7E3F309b4fa975 0x4927f90F62F3e43C837F8645a749074199fE84D7
Gave voting rights to 0x6cc80141Ae47922748C559D4bd7E3F309b4fa975. Transaction: 0x4b33537548ad0fd2c06b51265b98aceb78f25cb894f3f0089ce30d7f9d8fcea0
Gave voting rights to 0x4927f90F62F3e43C837F8645a749074199fE84D7. Transaction: 0x3965ded1537eea2dca75db4aeef4ae33b40d193008193a77117457be153829da


// delegate vote

npx ts-node --files ./scripts/DelegateVotes.ts 0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83 0x239Cc31D5e1225e90AD6BD561aE89772660C557c
Delegated vote to 0x239Cc31D5e1225e90AD6BD561aE89772660C557c. Transaction: 0x1bb877e766f8873a14b510cdd01954ab80ddce422b55d2b54ecd9cbebc42f6d3


// wining proposal 

at  ~/project is 📦 v1.0.0 took 2s 
❯ npx ts-node --files ./scripts/QueryResults.ts 0x22f89b7f5b27ef928df53cbb3d8d17247ac7fc83
Winning proposal:  icecream
