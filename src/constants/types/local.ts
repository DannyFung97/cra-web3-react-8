import { TransactionCondition, Error } from '../enums'

export type BlockData = { blockNumber?: number; blockTimestamp?: number }

export type LocalTx = {
  hash: any
  type: string
  status: TransactionCondition
}

export type ErrorData = {
  type: Error
  metadata: string
  uniqueId: string
}
