import { hexValue } from '@ethersproject/bytes'
import { Network } from '../types'

const chainId = 5

export const GoerliNetwork: Network = {
  name: 'Goerli',
  chainId: chainId,
  isTestnet: true,
  supportedTxTypes: [0, 2],
  rpc: {
    urls: ['https://mainnet.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'],
    pollingInterval: 12_000,
    blockConfirms: 2,
  },
  explorer: {
    name: 'Etherscan',
    key: '',
    url: 'https://etherscan.io',
    apiUrl: 'https://api.etherscan.io',
    excludedContractAddrs: [],
  },
  metamaskChain: {
    chainId: hexValue(chainId),
    chainName: 'Goerli Testnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
  config: {
    generalContracts: {},
    specialContracts: {},
    generalFeatures: {},
    specialFeatures: {},
  },
}
