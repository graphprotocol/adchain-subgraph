# AdChain
AdChain subgraph manifest for The Graph

Example queries:
{
  challenges(first: 50, where: {outcome: "failed"}) {
    id
    challenger
    commitEndDate
    revealEndDate
    challenger
    outcome
    rewardPool   
    totalTokens
    application {id, whitelisted, deposit}
    challengeId
  }
}

{
  applications(first: 1000, where:{deposit_gt:"10000000000"}) {
    id
    whitelisted
    deposit
  }
}
