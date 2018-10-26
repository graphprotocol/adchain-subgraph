import 'allocator/arena'
export { allocate_memory }

import { store } from '@graphprotocol/graph-ts'
import {
  _Application,
  _ApplicationRemoved,
  _ApplicationWhitelisted,
  _Challenge,
  _ChallengeFailed,
  _ChallengeSucceeded,
  _Deposit,
  _ListingRemoved,
  _ListingWithdrawn,
  _RewardClaimed,
  _Withdrawal,
  Registry,
} from './types/AdNetworks/Registry'
import { Application, Challenge, User, Withdrawal } from './types/schema'

// Respond to application white listed events
export function applicationWhitelist(event: _ApplicationWhitelisted): void {
  let listingHash = event.params.listingHash.toHex()

  // Bind registry contract
  let registry = Registry.bind(event.address)

  // Use listings method to get application data
  let listingResult = registry.listings(event.params.listingHash)

  // Create application entity
  let application = new Application()
  application.whitelisted = listingResult.value1
  application.expirationDate = listingResult.value0
  application.owner = listingResult.value2
  application.deposit = listingResult.value3

  let user = new User()
  user.address = listingResult.value2

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
  let application = new Application()
  application.deposit = appDeposit
  application.applicant = appApplicant
  application.endDate = appEndDate
  application.whitelisted = false

  // Apply store updates
  store.set('Application', appHash, application)
}

// Respond to challange submitted events
export function challenge(event: _Challenge): void {
  // Get param data from challenge event
  let listingHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID.toHex()
  let commitEndDate = event.params.commitEndDate
  let revealEndDate = event.params.revealEndDate
  let challenger = event.params.challenger

  // Create challenge entity
  let challenge = new Challenge()
  challenge.commitEndDate = commitEndDate
  challenge.revealEndDate = revealEndDate
  challenge.challenger = challenger
  challenge.application = listingHash
  challenge.outcome = 'pending'
  challenge.rewardClaimed = false

  let user = new User()
  user.address = challenger

  // Apply store updates
  store.set('Challenge', challengeId, challenge)
  store.set('User', challenger.toHex(), user)
}

// Respond to challenge succeeded events
export function challengeSucceeded(event: _ChallengeSucceeded): void {
  // Get param data from challenge succeeded event
  let listingHash = event.params.listingHash.toHex()
  let challengeId = event.params.challengeID
  let rewardPool = event.params.rewardPool
  let totalTokens = event.params.totalTokens

  // Create success entity
  let success = new Challenge()
  success.rewardPool = rewardPool
  success.totalTokens = totalTokens
  success.outcome = 'success'
  success.application = listingHash

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
  let fail = new Challenge()
  fail.rewardPool = rewardPool
  fail.totalTokens = totalTokens
  fail.outcome = 'failed'
  fail.application = listingHash

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

  // FIXME: fields don't match the Challenge entity
  // // Create fail entity
  // let deposit = new Challenge()
  // deposit.added = added
  // deposit.newTotal = newTotal
  // deposit.owner = owner.toHex()

  let user = new User()
  user.address = owner

  // Apply store updates
  // store.set('Challenge', depositId, deposit)
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
  let withdrawal = new Withdrawal()
  withdrawal.withdrew = withdrew
  withdrawal.newTotal = newTotal
  withdrawal.owner = owner

  let user = new User()
  user.address = owner

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
  let challengeReward = new Challenge()
  challengeReward.voter = voter
  challengeReward.rewardClaimed = true

  let user = new User()
  user.address = voter

  // Apply store updates
  store.set('Challenge', challengeId.toHex(), challengeReward)
  store.set('User', voter.toHex(), user)
}
