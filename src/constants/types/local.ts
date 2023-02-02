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

export type WindowDimensions = {
  width: number
  height: number
  isDesktop: boolean
  isMobile: boolean
  isSmallerMobile: boolean
  ifDesktop: <T, V>(desktopArg: T, mobileArg?: V | undefined) => T | V | undefined
  ifMobile: <T, V>(mobileArg: T, desktopArg?: V | undefined) => T | V | undefined
}
