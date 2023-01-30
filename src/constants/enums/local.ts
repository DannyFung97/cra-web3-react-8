export enum TransactionCondition {
  SUCCESS = 'Complete',
  FAILURE = 'Incomplete',
  PENDING = 'Pending',
  CANCELLED = 'Cancelled',
}

export enum Error {
  UNSUPPORTED_NETWORK = 'UN',
  NO_PROVIDER = 'NP',
  UNKNOWN_WALLET_ERROR = 'UWE',
  NO_ACCESS = 'NA',
  WALLET_NETWORK_UNSYNC = 'WNU',
}
