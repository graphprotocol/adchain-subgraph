export function applicationWhitelist(event: _ApplicationWhitelisted): void {
  let listingHash = event.params.listingHash.toHex()

  let application = new Entity()
  application.setString('id', listingHash)
  application.setBoolean('whitelisted', true)
  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Application', listingHash, application)
}

export function applicationRemoved(event: _ApplicationRemoved): void {
  let listingHash = event.params.listingHash.toHex()

  let listing = new Entity()
  listing.setString('id', listingHash)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.remove('Application', listingHash)
}

// export function application(event: _Application): void {
//
//   let app = new Entity()
//   app.setString('domain', event.params.domain)
//   app.setString('deposit', event.params.deposit)
//
//   // Apply store updates
//   let store = Store.bind(event.blockHash)
//   store.set('Application', event.params.domain.toHash(), app)
// }
export function applicationAdded(event: _Application): void {
  let appHash = event.params.listingHash.toHex()
  let appDeposit = event.params.deposit
  let appApplicant = event.params.applicant
  let appEndDate = event.params.appEndDate

  let app = new Entity()
  app.setString('id', appHash)
  app.setU256('deposit', appDeposit)
  app.setAddress('applicant', appApplicant)
  app.setU256('endDate', appEndDate)
  app.setBoolean('whitelisted', false)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Application', appHash, app)
}

export function challenge(event: _Challenge): void {
  let listingHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let commitEndDate = event.params.commitEndDate
  let revealEndDate = event.params.revealEndDate
  let challenger = event.params.challenger

  let challenge = new Entity()
  challenge.setU256('id', challengeId)
  challenge.setU256('commitEndDate', commitEndDate)
  challenge.setU256('revealEndDate', revealEndDate)
  challenge.setAddress('challenger', challenger)
  challenge.setString('application', listingHash)
  challenge.setString('data', event.params.data)

  let application = new Entity()
  application.setString('challenge', listingHash)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Challenge', challengeId.toHex(), challenge)
  store.set('Application', listingHash, application)
}

export function challengeSucceeded(event: _ChallengeSucceeded): void {
  let challengeHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  let success = new Entity()
  success.setU256('id', challengeId)
  success.setU256('rewardPool', rewardPool)
  success.setU256('totalTokens', totalTokens)
  success.setBoolean('outcome', true)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Challenge', challengeId.toHex(), success)
}

export function challengeFailed(event: _ChallengeFailed): void {
  let challengeHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  let fail = new Entity()
  fail.setU256('id', challengeId)
  fail.setU256('rewardPool', rewardPool)
  fail.setU256('totalTokens', totalTokens)
  fail.setBoolean('outcome', false)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Challenge', challengeId.toHex(), fail)
}

export function deposit(event: _Deposit): void {
  let depositHash = event.params.listingHash.toHex()
  let added = event.params.added
  let newTotal = event.params.newTotal
  let depositAddress = event.params.owner

  let deposit = new Entity()
  deposit.setU256('amountAdded', added)
  deposit.setU256('newTotal', newTotal)
  deposit.setAddress('address', depositAddress)

  let store = Store.bind(event.blockHash)
  store.set('Deposit', depositHash, deposit)
}
export function withdrawal(event: _Withdrawal): void {
  let withdrawHash = event.params.listingHash.toHex()
  let withdrew = event.params.withdrew
  let newTotal = event.params.newTotal
  let withdrawAddress = event.params.owner

  let deposit = new Entity()
  deposit.setU256('amountAdded', withdrew)
  deposit.setU256('newTotal', newTotal)
  deposit.setAddress('address', withdrawAddress)

  let store = Store.bind(event.blockHash)
  store.set('Withdrawal', withdrawHash, deposit)
}
