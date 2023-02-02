import { Contract, BigNumber, utils } from 'ethers'
import { ZERO } from '../constants'
import { getContract } from './contract'
import { equalsIgnoreCase } from './formatting'
import { numberify, rangeFrom0 } from './numeric'
import { withBackoffRetries } from './time'
import ierc20Alt from '../constants/abi/IERC20MetadataAlt.json'

const eth = '0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE'

export const queryBalance = async (tokenContract: Contract, user: string): Promise<BigNumber> => {
  return await withBackoffRetries(async () => tokenContract.balanceOf(user)).catch((e) => {
    console.log('queryBalance', tokenContract.address, 'for', user, e)
    return ZERO
  })
}

export const queryName = async (tokenContract: Contract, provider: any): Promise<string> => {
  if (equalsIgnoreCase(tokenContract.address, eth)) return 'Ether'
  try {
    return await withBackoffRetries(async () => tokenContract.name())
  } catch (e) {
    const tokenContractAlt = getContract(tokenContract.address, ierc20Alt.abi, provider)
    return await withBackoffRetries(async () => tokenContractAlt.name()).then(utils.parseBytes32String)
  }
}

export const querySymbol = async (tokenContract: Contract, provider: any): Promise<string> => {
  if (equalsIgnoreCase(tokenContract.address, eth)) return 'ETH'
  try {
    return await withBackoffRetries(async () => tokenContract.symbol())
  } catch (e) {
    const tokenContractAlt = getContract(tokenContract.address, ierc20Alt.abi, provider)
    return await withBackoffRetries(async () => tokenContractAlt.symbol()).then(utils.parseBytes32String)
  }
}

export const queryDecimals = async (tokenContract: Contract): Promise<number> => {
  if (equalsIgnoreCase(tokenContract.address, eth)) return 18
  return await withBackoffRetries(async () => tokenContract.decimals().then(numberify)).catch((e) => {
    console.log(`queryDecimals`, tokenContract.address, e)
    return 0
  })
}

export const queryUnderLying = async (tokenContract: Contract): Promise<string> => {
  return await withBackoffRetries(async () => tokenContract.underlying()).catch((e) => {
    console.log(`queryUnderLying`, tokenContract.address, e)
    return 'unreadableUnderlying'
  })
}

export const sortTokens = (tokenA: string, tokenB: string): [string, string] => {
  return BigNumber.from(tokenA).lt(BigNumber.from(tokenB)) ? [tokenA, tokenB] : [tokenB, tokenA]
}

export const listTokens = async (contract: Contract): Promise<BigNumber[]> => {
  const supply: BigNumber = await withBackoffRetries(async () => contract.totalSupply())
  const indices = rangeFrom0(supply.toNumber())
  const tokenIds: BigNumber[] = await Promise.all(
    indices.map(async (index: number) => await withBackoffRetries(async () => contract.tokenByIndex(index)))
  ).catch((e) => {
    console.log('error: listTokens', e)
    return []
  })
  return tokenIds
}

export const listTokensOfOwner = async (token: Contract, account: string): Promise<BigNumber[]> => {
  const numTokensOfOwner: BigNumber = await queryBalance(token, account)
  const indices = rangeFrom0(numTokensOfOwner.toNumber())
  const tokenIds: BigNumber[] = await Promise.all(
    indices.map(
      async (index: number) => await withBackoffRetries(async () => token.tokenOfOwnerByIndex(account, index))
    )
  ).catch((e) => {
    console.log('error: listTokensOfOwner', e)
    return []
  })
  return tokenIds
}

export const hasApproval = (tokenAllowance: string, amountToApprove: string): boolean => {
  const currentAllowance = BigNumber.from(tokenAllowance)
  if (currentAllowance.isZero()) return false
  const currentAmountToApprove = BigNumber.from(amountToApprove)
  if (currentAllowance.gte(currentAmountToApprove)) {
    return true
  }
  return false
}

export const validateTokenArrays = (arrayA: string[], arrayB: string[]): boolean => {
  return arrayA.length === arrayB.length && arrayA.every((value) => arrayB.includes(value))
}
