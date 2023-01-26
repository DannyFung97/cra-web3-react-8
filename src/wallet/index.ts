import { CoinbaseWallet } from '@web3-react/coinbase-wallet'
import { initializeConnector, Web3ReactHooks } from '@web3-react/core'
import { GnosisSafe } from '@web3-react/gnosis-safe'
import { MetaMask } from '@web3-react/metamask'
import { Network } from '@web3-react/network'
import { Connector } from '@web3-react/types'
import { WalletConnect } from '@web3-react/walletconnect'

import { RPC_URLS, RPC_PROVIDERS } from '../constants/networks'

export enum ConnectionType {
  INJECTED = 'INJECTED',
  COINBASE_WALLET = 'COINBASE_WALLET',
  WALLET_CONNECT = 'WALLET_CONNECT',
  NETWORK = 'NETWORK',
  GNOSIS_SAFE = 'GNOSIS_SAFE',
}

export interface Connection {
  name: string
  connector: Connector
  hooks: Web3ReactHooks
  type: ConnectionType
  logo: string
  supportedTxTypes: number[]
}

function onError(error: Error) {
  console.debug(`web3-react error: ${error}`)
}

const [web3Network, web3NetworkHooks] = initializeConnector<Network>(
  (actions) => new Network({ actions, urlMap: RPC_PROVIDERS, defaultChainId: 1 })
)
export const networkConnection: Connection = {
  name: 'Network',
  logo: '',
  supportedTxTypes: [0],
  connector: web3Network,
  hooks: web3NetworkHooks,
  type: ConnectionType.NETWORK,
}

const [web3Injected, web3InjectedHooks] = initializeConnector<MetaMask>((actions) => new MetaMask({ actions, onError }))
export const injectedConnection: Connection = {
  name: 'Injected',
  logo: '',
  supportedTxTypes: [0, 2],
  connector: web3Injected,
  hooks: web3InjectedHooks,
  type: ConnectionType.INJECTED,
}

const [web3GnosisSafe, web3GnosisSafeHooks] = initializeConnector<GnosisSafe>((actions) => new GnosisSafe({ actions }))
export const gnosisSafeConnection: Connection = {
  name: 'Gnosis Safe',
  logo: '',
  supportedTxTypes: [0],
  connector: web3GnosisSafe,
  hooks: web3GnosisSafeHooks,
  type: ConnectionType.GNOSIS_SAFE,
}

const [web3WalletConnect, web3WalletConnectHooks] = initializeConnector<WalletConnect>((actions) => {
  // Avoid testing for the best URL by only passing a single URL per chain.
  // Otherwise, WC will not initialize until all URLs have been tested (see getBestUrl in web3-react).
  const RPC_URLS_WITHOUT_FALLBACKS = Object.entries(RPC_URLS).reduce(
    (map, [chainId, urls]) => ({
      ...map,
      [chainId]: urls[0],
    }),
    {}
  )
  return new WalletConnect({
    actions,
    options: {
      rpc: RPC_URLS_WITHOUT_FALLBACKS,
      qrcode: true,
    },
    onError,
  })
})
export const walletConnectConnection: Connection = {
  name: 'WalletConnect',
  logo: '',
  supportedTxTypes: [0],
  connector: web3WalletConnect,
  hooks: web3WalletConnectHooks,
  type: ConnectionType.WALLET_CONNECT,
}

const [web3CoinbaseWallet, web3CoinbaseWalletHooks] = initializeConnector<CoinbaseWallet>(
  (actions) =>
    new CoinbaseWallet({
      actions,
      options: {
        url: RPC_URLS[1][0],
        appName: 'New',
        appLogoUrl: '',
        reloadOnDisconnect: false,
      },
      onError,
    })
)

export const coinbaseWalletConnection: Connection = {
  name: 'Coinbase Wallet',
  logo: '',
  supportedTxTypes: [0],
  connector: web3CoinbaseWallet,
  hooks: web3CoinbaseWalletHooks,
  type: ConnectionType.COINBASE_WALLET,
}

export const SUPPORTED_WALLETS = [
  injectedConnection,
  coinbaseWalletConnection,
  walletConnectConnection,
  networkConnection,
  gnosisSafeConnection,
]

export const SELECTABLE_WALLETS = [injectedConnection, coinbaseWalletConnection, walletConnectConnection]

export const CONNECTION_TO_CONNECTION_TYPE: { [key: string]: Connection } = SUPPORTED_WALLETS.reduce(
  (map, connection) => ({
    ...map,
    [connection.type]: connection,
  }),
  {}
)
