import { useWeb3React } from '@web3-react/core'
import { useEffect, useState } from 'react'
import { CONNECTION_TYPE_TO_CONNECTION, injectedConnection } from '../../wallet'
import { Connection } from '../../wallet'

export const useEagerConnect = (
  connect: (walletConnection: Connection, eagerlyConnect?: boolean) => Promise<void>,
  manuallyDisconnected: boolean,
  selectedProvider?: string
): boolean => {
  const { isActive } = useWeb3React()
  const [triedLocallyStored, setTriedLocallyStored] = useState(false)
  const [tried, setTried] = useState(false)

  useEffect(() => {
    const tryConnectEagerly = async () => {
      if (selectedProvider && !triedLocallyStored) {
        const connection = CONNECTION_TYPE_TO_CONNECTION[selectedProvider]
        if (connection) {
          await connect(connection, true)
        }
      }
      setTriedLocallyStored(true)
    }
    tryConnectEagerly()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Try injected connector if the web3 is still not active & already tried using locally stored provider
  useEffect(() => {
    const tryConnect = async () => {
      if (!isActive && triedLocallyStored && (window as any).ethereum && !manuallyDisconnected) {
        await connect(injectedConnection).catch(() => setTried(true))
      }
    }
    tryConnect()
  }, [connect, isActive, triedLocallyStored, manuallyDisconnected])

  // wait until we get confirmation of a connection to flip the flag
  useEffect(() => {
    if (isActive && !manuallyDisconnected) {
      setTried(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive])

  // tried is a flag for allowing inactiveListener to be called, isInjected indicates if connector is an injected, not an injected, or undefined
  return tried
}

// in case eager connect did not connect the user's wallet, react to logins on a potential injected provider
export const useInactiveListener = (
  canListen = true,
  connect: (walletConnector: Connection, eagerlyConnect?: boolean) => Promise<void>
): void => {
  const { isActive } = useWeb3React()
  useEffect(() => {
    const ethereum = (window as any).ethereum

    // if web3 is inactive
    if (canListen && !isActive && ethereum && ethereum.on) {
      const handleConnect = () => {
        console.log("Handling 'connect' event")
        connect(injectedConnection)
      }

      const handleChainChanged = (chainId: string | number) => {
        console.log("Handling 'chainChanged' event with payload", chainId)
        connect(injectedConnection).catch((error) => {
          console.error('Failed to activate after chain changed', error)
        })
      }
      const handleAccountsChanged = (accounts: string[]) => {
        console.log("Handling 'accountsChanged' event with payload", accounts)
        if (accounts.length > 0) {
          connect(injectedConnection).catch((error) => {
            console.error('Failed to activate after accounts changed', error)
          })
        }
      }
      const handleNetworkChanged = (networkId: string | number) => {
        console.log("Handling 'networkChanged' event with payload", networkId)
        connect(injectedConnection)
      }

      ethereum.on('connect', handleConnect)
      ethereum.on('chainChanged', handleChainChanged)
      ethereum.on('accountsChanged', handleAccountsChanged)
      ethereum.on('networkChanged', handleNetworkChanged)

      return () => {
        if (ethereum.removeListener) {
          ethereum.removeListener('connect', handleConnect)
          ethereum.removeListener('chainChanged', handleChainChanged)
          ethereum.removeListener('accountsChanged', handleAccountsChanged)
          ethereum.removeListener('networkChanged', handleNetworkChanged)
        }
      }
    } else {
    }

    return undefined
  }, [isActive, canListen, connect])
}
