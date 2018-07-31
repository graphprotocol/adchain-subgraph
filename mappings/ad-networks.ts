export function applicationWhitelist(event: _ApplicationWhitelisted): void {
  let listingHash = event.params.listingHash.toHex()

  // let registry = Registry.bind(event.address, event.blockHash)
  // let listingresult = registry.listings(event.params.listingHash)

  let listing = new Entity()
  // listing.setU256('expirationDate', listingresult.value0)
  // listing.setBoolean('whitelisted', listingresult.value1)
  // listing.setAddress('owner', listingresult.value2)
  // listing.setU256('unstakedDeposit', listingresult.value3)
  listing.setString('listHash', listingHash)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('whiteListedApplication', listingHash, listing)
}

export function applicationRemoved(event: _ApplicationRemoved): void {
  let listingHash = event.params.listingHash.toHex()

  let listing = new Entity()
  listing.setString('listHash', listingHash)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.remove('application', listingHash)
}
//
// export function applicationAdded(event: _Application): void {
//   let appHash = event.params.listingHash.toHex()
//   let appDeposit = event.params.deposit
//   let appApplicant = event.params.applicant
//   let appEndDate = event.params.appEndDate
//
//   let app = new Entity()
//   app.setU256('deposit', appDeposit)
//   app.setAddress('applicant', appApplicant)
//   app.setU256('endDate', appEndDate)
//
//   // Apply store updates
//   let store = Store.bind(event.blockHash)
//   store.set('application', appHash, app)
// }

export function challenge(event: _Challenge): void {
  let challengeHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let commitEndDate = event.params.commitEndDate
  let revealEndDate = event.params.revealEndDate
  let challenger = event.params.challenger

  let challenge = new Entity()
  challenge.setU256('id', challengeId)
  challenge.setU256('commitEndDate', commitEndDate)
  challenge.setU256('revealEndDate', revealEndDate)
  challenge.setAddress('challenger', challenger)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('challenge', challengeHash, challenge)
}
