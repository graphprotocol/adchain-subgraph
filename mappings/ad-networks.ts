// Respond to application white listed events
export function applicationWhitelist(event: _ApplicationWhitelisted): void {
  let listingHash = event.params.listingHash.toHex()

  // Bind registry contract
  let registry = Registry.bind(event.address, event.blockHash)
  // Use listings method to get application data
  let listingResult = registry.listings(event.params.listingHash)

  // Create application entity
  let application = new Entity()
  application.setString('id', listingHash)
  application.setBoolean('whitelisted', true)
  application.setU256('expirationDate', listingResult.value0)
  application.setBoolean('whitelisted', listingResult.value1)
  application.setAddress('owner', listingResult.value2)
  application.setU256('deposit', listingResult.value3)

  // Apply store updates (insert or update if entity already exists)
  let store = Store.bind(event.blockHash)
  store.set('Application', listingHash, application)
}

// Respond to application removed events
export function applicationRemoved(event: _ApplicationRemoved): void {
  let listingHash = event.params.listingHash.toHex()

  // Remove application from the store
  let store = Store.bind(event.blockHash)
  store.remove('Application', listingHash)
}

// Respond to application added events
export function applicationAdded(event: _Application): void {
  // Get param data from application event
  let appHash = event.params.listingHash.toHex()
  let appDeposit = event.params.deposit
  let appApplicant = event.params.applicant
  let appEndDate = event.params.appEndDate

  // Create application entity
  let application = new Entity()
  application.setString('id', appHash)
  application.setU256('deposit', appDeposit)
  application.setAddress('applicant', appApplicant)
  application.setU256('endDate', appEndDate)
  application.setBoolean('whitelisted', false)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Application', appHash, application)
}

// Respond to challange submitted events
export function challenge(event: _Challenge): void {
// Get param data from challenge event
  let listingHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let commitEndDate = event.params.commitEndDate
  let revealEndDate = event.params.revealEndDate
  let challenger = event.params.challenger

  // Create challenge entity
  let challenge = new Entity()
  challenge.setString('id', listingHash)
  challenge.setU256('challengeId', challengeId)
  challenge.setU256('commitEndDate', commitEndDate)
  challenge.setU256('revealEndDate', revealEndDate)
  challenge.setAddress('challenger', challenger)
  challenge.setString('application', listingHash)
  challenge.setString('outcome', 'pending')

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Challenge', challengeId.toHex(), challenge)
}

// Respond to challenge succeeded events
export function challengeSucceeded(event: _ChallengeSucceeded): void {
  // Get param data from challenge succeeded event
  let challengeHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  // Create success entity
  let success = new Entity()
  success.setString('id', challengeHash)
  success.setU256('challengeId', challengeId)
  success.setU256('rewardPool', rewardPool)
  success.setU256('totalTokens', totalTokens)
  success.setString('outcome', 'success')

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Challenge', challengeId.toHex(), success)
}

// Respond to challenge failed events
export function challengeFailed(event: _ChallengeFailed): void {
  // Get param data from challenge succeeded event
  let challengeHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  // Create fail entity
  let fail = new Entity()
  fail.setString('id', challengeHash)
  fail.setU256('challengeId', challengeId)
  fail.setU256('rewardPool', rewardPool)
  fail.setU256('totalTokens', totalTokens)
  fail.setString('outcome', 'failed')

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Challenge', challengeId.toHex(), fail)
}
