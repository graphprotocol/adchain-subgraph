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

  let user = new Entity()
  user.setAddress('address', listingResult.value2)

  // Apply store updates (insert or update if entity already exists)
  store.set('Application', listingHash, application)
  store.set('User', listingResult.value2.toHex(), user)
}

// Respond to application removed events
export function applicationRemoved(event: _ApplicationRemoved): void {
  let listingHash = event.params.listingHash.toHex()

  // Remove application from the store
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
  challenge.setU256('id', challengeId)
  challenge.setU256('commitEndDate', commitEndDate)
  challenge.setU256('revealEndDate', revealEndDate)
  challenge.setAddress('challenger', challenger)
  challenge.setString('application', listingHash)
  challenge.setString('outcome', 'pending')
  challenge.setBoolean('rewardClaimed', false)

  let user = new Entity()
  user.setAddress('address', challenger)

  // Apply store updates
  store.set('Challenge', challengeId.toHex(), challenge)
}

// Respond to challenge succeeded events
export function challengeSucceeded(event: _ChallengeSucceeded): void {
  // Get param data from challenge succeeded event
  let listingHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  // Create success entity
  let success = new Entity()
  success.setU256('id', challengeId)
  success.setU256('rewardPool', rewardPool)
  success.setU256('totalTokens', totalTokens)
  success.setString('outcome', 'success')
  success.setString('application', listingHash)

  // Apply store updates
  store.set('Challenge', challengeId.toHex(), success)
}

// Respond to challenge failed events
export function challengeFailed(event: _ChallengeFailed): void {
  // Get param data from challenge succeeded event
  let listingHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  // Create fail entity
  let fail = new Entity()
  fail.setU256('id', challengeId)
  fail.setU256('rewardPool', rewardPool)
  fail.setU256('totalTokens', totalTokens)
  fail.setString('outcome', 'failed')
  fail.setString('application', listingHash)

  // Apply store updates
  store.set('Challenge', challengeId.toHex(), fail)
}

// Respond to deposit events
export function deposit(event: _Deposit): void {
  // Get param data from deposit event
  let listingHash = event.params.listingHash.toHex()
  let added = event.params.added
  let newTotal = event.params.newTotal
  let owner = event.params.owner
  let depositId = listingHash + '_' + owner.toHex()

  // Create fail entity
  let deposit = new Entity()
  deposit.setString('id', depositId)
  deposit.setU256('added', added)
  deposit.setU256('newTotal', newTotal)
  deposit.setString('owner', owner.toHex())

  let user = new Entity()
  user.setAddress('address', owner)

  // Apply store updates
  store.set('Challenge', depositId, deposit)
  store.set('User', owner.toHex(), user)
}

// Respond to withdrawal events
export function withdrawal(event: _Withdrawal): void {
  // Get param data from withdrawal event
  let listingHash = event.params.listingHash.toHex()
  let withdrew = event.params.withdrew
  let newTotal = event.params.newTotal
  let owner = event.params.owner
  let withdrawId = listingHash + '_' + owner.toHex()

  // Create fail entity
  let withdrawal = new Entity()
  withdrawal.setString('id', withdrawId)
  withdrawal.setU256('withdrew', withdrew)
  withdrawal.setU256('newTotal', newTotal)
  withdrawal.setString('owner', owner.toHex())

  let user = new Entity()
  user.setAddress('address', owner)

  // Apply store updates
  store.set('Withdrawal', withdrawId, withdrawal)
  store.set('User', owner.toHex(), user)
}

// Respond to listing removed events
export function listingRemoved(event: _ListingRemoved): void {
  // Get param data from listing removed event
  let listingHash = event.params.listingHash.toHex()

  // Apply store updates
  store.remove('Application', listingHash)
}

// Respond to listing withdrawn events
export function listingWithdrawn(event: _ListingWithdrawn): void {
  // Get param data from listingWithdrawn event
  let listingHash = event.params.listingHash.toHex()

  // Apply store updates
  store.remove('Application', listingHash)
}

// Respond to reward claimed events
export function rewardClaimed(event: _RewardClaimed): void {
  // Get param data from rewardClaimed event
  let challengeId = event.params.challengeID
  let voter = event.params.voter

  // Create challenge reward entity
  let challengeReward = new Entity()
  challengeReward.setAddress('voter', voter)
  challengeReward.setBoolean('rewardClaimed', true)

  let user = new Entity()
  user.setAddress('address', voter)

  // Apply store updates
  store.set('Challenge', challengeId.toHex(), challengeReward)
  store.set('User', voter.toHex(), user)
}
