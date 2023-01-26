import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { useNetwork } from '../context/NetworkManager'
import { useProvider } from '../context/ProviderManager'
import { useWallet } from '../context/WalletManager'
import { ConnectionType, getConnectionName, SUPPORTED_WALLETS } from '../wallet'

export function Home(): JSX.Element {
  const { openWalletModal } = useWallet()
  const { activeNetwork } = useNetwork()
  const { openNetworkModal } = useProvider()
  const { account, connector } = useWeb3React()

  return (
    <div className="App">
      <h1>{account ?? 'No account found'}</h1>
      <h2>{activeNetwork.name ?? 'No Network'}</h2>
      <h2>
        {`${SUPPORTED_WALLETS.find((c) => c.connector === connector)?.type} (${getConnectionName(
          SUPPORTED_WALLETS.find((c) => c.connector === connector)?.type as ConnectionType
        )})` ?? 'No Connector'}
      </h2>
      <button onClick={openWalletModal}>open wallet modal</button>
      <button onClick={openNetworkModal}>open network modal</button>
    </div>
  )
}
