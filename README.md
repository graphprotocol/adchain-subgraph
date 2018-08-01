# AdChain
AdChain subgraph manifest for The Graph

This is an example subgraph which demonstrates how to write
* A subgraph manifest
* A GraphQL schema
* A mapping script

This example uses the AdChain  registry that was recently deployed to mainnet. This registry keeps a list of websites that are deemed to not be committing ad fraud. Any AdChain token holder can submit an application to include a new website onto the list. Those applications can be challenged by other token holders. All of this data can be queried using The Graph.


This example uses the [AdChain](https://publisher.adchain.com/registry) that was recently deployed to mainnet. This registry keeps a list of websites that are deemed to not be committing ad fraud. Any AdChain token holder can submit an application to include a new website onto the list. Those applications can be challenged by other token holders. All of this data can be queried using The Graph.

See the [getting started guide](https://github.com/graphprotocol/graph-node/blob/master/getting-started-docs/docs/getting-started.md) for details on setting up a Graph node using this subgraph.


Once you have built the subgraph and started a Graph Node you may open a GraphiQL browser at `127.0.0.1:8000` and get started with these example queries.
```
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
    application {
      id,
      whitelisted,
      deposit
    }
    challengeId
  }
}
```

```
{
  applications(first: 1000, where:{deposit_gt:"10000000000"}) {
    id
    whitelisted
    deposit
  }
}
```
