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
}
