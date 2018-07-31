export function applicationWhitelisted(event: _ApplicationWhitelisted): void {
  let listingHash = event.params.listingHash.toHex()

  let registry = Registry.bind(event.address, event.blockhash)
  let listingresult = registry.listings(pollHash)

  let listing = new Entity()
  listingresult.setString('expirationData', listing[0])
  listingresult.setString('whitelisted', listing[1])
  listingresult.setString('owner', listing[2])
  listingresult.setString('unstakedDeposit', listing[3])
  listingresult.setString('challengeId', listing[4])

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Listing', listingHash, listing)
}
