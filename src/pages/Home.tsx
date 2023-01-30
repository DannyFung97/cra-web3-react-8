import { useWeb3React } from '@web3-react/core'
import React from 'react'
import { TransactionCondition } from '../constants/enums'
import { useNetwork, useNotifications, useProvider, useWallet } from '../context'
import { ConnectionType, getConnectionName, SUPPORTED_WALLETS } from '../wallet'

export function Home(): JSX.Element {
  const { openWalletModal } = useWallet()
  const { activeNetwork } = useNetwork()
  const { openNetworkModal } = useProvider()
  const { makeTxToast } = useNotifications()
  const { account, connector } = useWeb3React()

  const successToast = async () => {
    makeTxToast('t', TransactionCondition.PENDING, 'worldS')
    await new Promise((resolve) => setTimeout(() => resolve('worldS'), 3000))
    console.log('hey')
    makeTxToast('t', TransactionCondition.SUCCESS, 'worldS')
  }

  const failToast = async () => {
    makeTxToast('t', TransactionCondition.PENDING, 'worldF')
    await new Promise((resolve) => setTimeout(() => resolve('worldF'), 3000))
    makeTxToast('t', TransactionCondition.FAILURE, 'worldF')
  }

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
      <button onClick={successToast}>create successful toast</button>
      <button onClick={failToast}> create failed toast</button>
    </div>
  )
}
