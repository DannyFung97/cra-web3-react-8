import { ContractSources } from '.'

export type Network = {
  name: string
  chainId: number
  isTestnet: boolean
  supportedTxTypes: number[]
  rpc: {
    urls: string[]
    pollingInterval: number
    blockConfirms: number
  }
  explorer: {
    name: string
    key: string
    url: string
    apiUrl: string
    excludedContractAddrs: string[]
  }
  metamaskChain: {
    chainId: string
    chainName: string
    nativeCurrency: {
      name: string
      symbol: string
      decimals: number
    }
    rpcUrls: string[]
    blockExplorerUrls: string[]
  }
  config: {
    generalContracts: { [key: string]: ContractSources }
    specialContracts: { [key: string]: ContractSources }
    generalFeatures: { [key: string]: boolean }
    specialFeatures: { [key: string]: boolean }
  }
}
