import { useCallback } from 'react'
import { useWeb3React } from '@web3-react/core'
import { Connection } from '../../wallet'

export const useWalletHandler = (
  setSelectedProvider?: (value: string | undefined) => void,
  removeSelectedProvider?: () => void,
  setManuallyDisconnected?: (value: boolean) => void
): {
  connect: (connection: Connection, eagerlyConnect?: boolean) => Promise<void>
  disconnect: () => void
} => {
  const { connector } = useWeb3React()

  const connect = useCallback(
    async (connection: Connection, eagerlyConnect?: boolean) => {
      try {
        if (connection.connector.connectEagerly && eagerlyConnect) {
          await connection.connector.connectEagerly()
        } else {
          await connection.connector.activate()
        }
        onSuccess()
      } catch (error) {
        console.log('error', error)
        onError()
      }

      function onSuccess() {
        setSelectedProvider?.(connection.type)
        setManuallyDisconnected?.(false)
        console.log('success')
      }

      function onError() {
        console.log('error')
      }
    },
    [setManuallyDisconnected, setSelectedProvider]
  )

  const disconnect = useCallback(() => {
    if (connector) {
      if (connector.deactivate) {
        connector.deactivate()
      } else {
        connector.resetState()
      }
      setManuallyDisconnected?.(true)
      removeSelectedProvider?.()
    }
  }, [connector, removeSelectedProvider, setManuallyDisconnected])

  return {
    connect,
    disconnect,
  }
}
