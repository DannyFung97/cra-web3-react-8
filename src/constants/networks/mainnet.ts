import { hexValue } from '@ethersproject/bytes'
import { Network } from '../types'

const chainId = 1

export const MainNetwork: Network = {
  name: 'Ethereum',
  chainId: chainId,
  isTestnet: false,
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
  },
  metamaskChain: {
    chainId: hexValue(chainId),
    chainName: 'Ethereum Mainnet',
    nativeCurrency: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    rpcUrls: ['https://mainnet.infura.io/v3/'],
    blockExplorerUrls: ['https://etherscan.io'],
  },
}