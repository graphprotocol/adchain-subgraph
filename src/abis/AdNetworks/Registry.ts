import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  I128,
  U128,
  I256,
  U256,
  H256
} from "@graphprotocol/graph-ts";

export class _Application extends EthereumEvent {
  get params(): _ApplicationParams {
    return new _ApplicationParams(this);
  }
}

export class _ApplicationParams {
  _event: _Application;

  constructor(event: _Application) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get deposit(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get appEndDate(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get data(): string {
    return this._event.parameters[3].value.toString();
  }

  get applicant(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class _Challenge extends EthereumEvent {
  get params(): _ChallengeParams {
    return new _ChallengeParams(this);
  }
}

export class _ChallengeParams {
  _event: _Challenge;

  constructor(event: _Challenge) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get challengeID(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get data(): string {
    return this._event.parameters[2].value.toString();
  }

  get commitEndDate(): U256 {
    return this._event.parameters[3].value.toU256();
  }

  get revealEndDate(): U256 {
    return this._event.parameters[4].value.toU256();
  }

  get challenger(): Address {
    return this._event.parameters[5].value.toAddress();
  }
}

export class _Deposit extends EthereumEvent {
  get params(): _DepositParams {
    return new _DepositParams(this);
  }
}

export class _DepositParams {
  _event: _Deposit;

  constructor(event: _Deposit) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get added(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get newTotal(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get owner(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class _Withdrawal extends EthereumEvent {
  get params(): _WithdrawalParams {
    return new _WithdrawalParams(this);
  }
}

export class _WithdrawalParams {
  _event: _Withdrawal;

  constructor(event: _Withdrawal) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get withdrew(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get newTotal(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get owner(): Address {
    return this._event.parameters[3].value.toAddress();
  }
}

export class _ApplicationWhitelisted extends EthereumEvent {
  get params(): _ApplicationWhitelistedParams {
    return new _ApplicationWhitelistedParams(this);
  }
}

export class _ApplicationWhitelistedParams {
  _event: _ApplicationWhitelisted;

  constructor(event: _ApplicationWhitelisted) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class _ApplicationRemoved extends EthereumEvent {
  get params(): _ApplicationRemovedParams {
    return new _ApplicationRemovedParams(this);
  }
}

export class _ApplicationRemovedParams {
  _event: _ApplicationRemoved;

  constructor(event: _ApplicationRemoved) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class _ListingRemoved extends EthereumEvent {
  get params(): _ListingRemovedParams {
    return new _ListingRemovedParams(this);
  }
}

export class _ListingRemovedParams {
  _event: _ListingRemoved;

  constructor(event: _ListingRemoved) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class _ListingWithdrawn extends EthereumEvent {
  get params(): _ListingWithdrawnParams {
    return new _ListingWithdrawnParams(this);
  }
}

export class _ListingWithdrawnParams {
  _event: _ListingWithdrawn;

  constructor(event: _ListingWithdrawn) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class _TouchAndRemoved extends EthereumEvent {
  get params(): _TouchAndRemovedParams {
    return new _TouchAndRemovedParams(this);
  }
}

export class _TouchAndRemovedParams {
  _event: _TouchAndRemoved;

  constructor(event: _TouchAndRemoved) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }
}

export class _ChallengeFailed extends EthereumEvent {
  get params(): _ChallengeFailedParams {
    return new _ChallengeFailedParams(this);
  }
}

export class _ChallengeFailedParams {
  _event: _ChallengeFailed;

  constructor(event: _ChallengeFailed) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get challengeID(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get rewardPool(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get totalTokens(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class _ChallengeSucceeded extends EthereumEvent {
  get params(): _ChallengeSucceededParams {
    return new _ChallengeSucceededParams(this);
  }
}

export class _ChallengeSucceededParams {
  _event: _ChallengeSucceeded;

  constructor(event: _ChallengeSucceeded) {
    this._event = event;
  }

  get listingHash(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get challengeID(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get rewardPool(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get totalTokens(): U256 {
    return this._event.parameters[3].value.toU256();
  }
}

export class _RewardClaimed extends EthereumEvent {
  get params(): _RewardClaimedParams {
    return new _RewardClaimedParams(this);
  }
}

export class _RewardClaimedParams {
  _event: _RewardClaimed;

  constructor(event: _RewardClaimed) {
    this._event = event;
  }

  get challengeID(): U256 {
    return this._event.parameters[0].value.toU256();
  }

  get reward(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get voter(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class Registry__challengesResult {
  value0: U256;
  value1: Address;
  value2: boolean;
  value3: U256;
  value4: U256;

  constructor(
    value0: U256,
    value1: Address,
    value2: boolean,
    value3: U256,
    value4: U256
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromU256(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromBoolean(this.value2));
    map.set("value3", EthereumValue.fromU256(this.value3));
    map.set("value4", EthereumValue.fromU256(this.value4));
    return map;
  }
}

export class Registry__listingsResult {
  value0: U256;
  value1: boolean;
  value2: Address;
  value3: U256;
  value4: U256;

  constructor(
    value0: U256,
    value1: boolean,
    value2: Address,
    value3: U256,
    value4: U256
  ) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
    this.value4 = value4;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromU256(this.value0));
    map.set("value1", EthereumValue.fromBoolean(this.value1));
    map.set("value2", EthereumValue.fromAddress(this.value2));
    map.set("value3", EthereumValue.fromU256(this.value3));
    map.set("value4", EthereumValue.fromU256(this.value4));
    return map;
  }
}

export class Registry extends SmartContract {
  static bind(address: Address): Registry {
    return new Registry("Registry", address);
  }

  isWhitelisted(_listingHash: Bytes): boolean {
    let result = super.call("isWhitelisted", [
      EthereumValue.fromFixedBytes(_listingHash)
    ]);
    return result[0].toBoolean();
  }

  name(): string {
    let result = super.call("name", []);
    return result[0].toString();
  }

  challengeExists(_listingHash: Bytes): boolean {
    let result = super.call("challengeExists", [
      EthereumValue.fromFixedBytes(_listingHash)
    ]);
    return result[0].toBoolean();
  }

  canBeWhitelisted(_listingHash: Bytes): boolean {
    let result = super.call("canBeWhitelisted", [
      EthereumValue.fromFixedBytes(_listingHash)
    ]);
    return result[0].toBoolean();
  }

  challengeCanBeResolved(_listingHash: Bytes): boolean {
    let result = super.call("challengeCanBeResolved", [
      EthereumValue.fromFixedBytes(_listingHash)
    ]);
    return result[0].toBoolean();
  }

  appWasMade(_listingHash: Bytes): boolean {
    let result = super.call("appWasMade", [
      EthereumValue.fromFixedBytes(_listingHash)
    ]);
    return result[0].toBoolean();
  }

  challenges(param0: U256): Registry__challengesResult {
    let result = super.call("challenges", [EthereumValue.fromU256(param0)]);
    return new Registry__challengesResult(
      result[0].toU256(),
      result[1].toAddress(),
      result[2].toBoolean(),
      result[3].toU256(),
      result[4].toU256()
    );
  }

  tokenClaims(_challengeID: U256, _voter: Address): boolean {
    let result = super.call("tokenClaims", [
      EthereumValue.fromU256(_challengeID),
      EthereumValue.fromAddress(_voter)
    ]);
    return result[0].toBoolean();
  }

  voterReward(_voter: Address, _challengeID: U256, _salt: U256): U256 {
    let result = super.call("voterReward", [
      EthereumValue.fromAddress(_voter),
      EthereumValue.fromU256(_challengeID),
      EthereumValue.fromU256(_salt)
    ]);
    return result[0].toU256();
  }

  listings(param0: Bytes): Registry__listingsResult {
    let result = super.call("listings", [EthereumValue.fromFixedBytes(param0)]);
    return new Registry__listingsResult(
      result[0].toU256(),
      result[1].toBoolean(),
      result[2].toAddress(),
      result[3].toU256(),
      result[4].toU256()
    );
  }

  determineReward(_challengeID: U256): U256 {
    let result = super.call("determineReward", [
      EthereumValue.fromU256(_challengeID)
    ]);
    return result[0].toU256();
  }

  parameterizer(): Address {
    let result = super.call("parameterizer", []);
    return result[0].toAddress();
  }

  token(): Address {
    let result = super.call("token", []);
    return result[0].toAddress();
  }

  voting(): Address {
    let result = super.call("voting", []);
    return result[0].toAddress();
  }
}
