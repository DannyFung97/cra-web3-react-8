import { MainNetwork } from './mainnet'
import { StaticJsonRpcProvider } from '@ethersproject/providers'
import { Network } from '../types'
import { GoerliNetwork } from './goerli'

class AppJsonRpcProvider extends StaticJsonRpcProvider {
  private _blockCache = new Map<string, Promise<any>>()
  get blockCache() {
    // If the blockCache has not yet been initialized this block, do so by
    // setting a listener to clear it on the next block.
    if (!this._blockCache.size) {
      this.once('block', () => this._blockCache.clear())
    }
    return this._blockCache
  }

  constructor(chainId: number) {
    // Including networkish allows ethers to skip the initial detectNetwork call.
    super(RPC_URLS[chainId][0], /* networkish= */ { chainId, name: CHAIN_IDS_TO_NETWORKS[chainId].name })

    // NB: Third-party providers (eg MetaMask) will have their own polling intervals,
    // which should be left as-is to allow operations (eg transaction confirmation) to resolve faster.
    // Network providers (eg AppJsonRpcProvider) need to update less frequently to be considered responsive.
    this.pollingInterval = CHAIN_IDS_TO_NETWORKS[chainId].rpc.pollingInterval
  }
}

export const NETWORKS = [MainNetwork, GoerliNetwork]

export const CHAIN_IDS_TO_NETWORKS = NETWORKS.reduce((acc, network) => {
  acc[network.chainId] = network
  return acc
}, {} as { [key: number]: Network })

export const RPC_URLS: { [key: number]: string[] } = NETWORKS.reduce((acc, network) => {
  acc[network.chainId] = network.rpc.urls
  return acc
}, {} as { [key: number]: string[] })

export const RPC_PROVIDERS: { [key: number]: StaticJsonRpcProvider } = NETWORKS.reduce((acc, network) => {
  acc[network.chainId] = new AppJsonRpcProvider(network.chainId)
  return acc
}, {} as { [key: number]: StaticJsonRpcProvider })
