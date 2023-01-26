import { useMemo } from 'react'
import { Connection, ConnectionType, CONNECTION_TO_CONNECTION_TYPE, SELECTABLE_WALLETS } from '../../wallet'

export default function useOrderedConnections(selectedProvider?: string): Connection[] {
  const selectedWallet = selectedProvider
  return useMemo(() => {
    const orderedConnectionTypes: ConnectionType[] = []

    // Always attempt to use to Gnosis Safe first, as we can't know if we're in a SafeContext.
    orderedConnectionTypes.push(ConnectionType.GNOSIS_SAFE)

    // Add the `selectedWallet` to the top so it's prioritized, then add the other selectable wallets.
    if (selectedWallet && SELECTABLE_WALLETS.map((wallet) => wallet.type).includes(selectedWallet as ConnectionType)) {
      orderedConnectionTypes.push(selectedWallet as ConnectionType)
    }
    orderedConnectionTypes.push(
      ...SELECTABLE_WALLETS.map((wallet) => wallet.type).filter((wallet) => wallet !== selectedWallet)
    )

    // Add network connection last as it should be the fallback.
    orderedConnectionTypes.push(ConnectionType.NETWORK)

    return orderedConnectionTypes.map((type) => CONNECTION_TO_CONNECTION_TYPE[type])
  }, [selectedWallet])
}
