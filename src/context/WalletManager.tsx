import React, { createContext, PropsWithChildren, useContext, useMemo, useRef, useState } from 'react'
import { useEagerConnect, useInactiveListener } from '../hooks/wallet/useEagerlyConnect'
import { useWalletHandler } from '../hooks/wallet/useWalletHandler'
import { useWalletModal } from '../hooks/wallet/useWalletModal'
import { WalletModal } from '../components/organisms/WalletModal'
import { useGeneral } from './GeneralManager'
import { Connection } from '../wallet'

type WalletContextType = {
  connect: (connection: Connection) => void
  disconnect: () => void
  openWalletModal: () => void
}

const WalletContext = createContext<WalletContextType>({
  connect: () => undefined,
  disconnect: () => undefined,
  openWalletModal: () => undefined,
})

export function WalletManager(props: PropsWithChildren): JSX.Element {
  const { selectedProvider, setSelectedProvider, removeSelectedProvider } = useGeneral()
  const [manuallyDisconnected, setManuallyDisconnected] = useState(false)

  const { connect, disconnect } = useWalletHandler(setSelectedProvider, removeSelectedProvider, setManuallyDisconnected)

  const triedEager = useEagerConnect(connect, manuallyDisconnected, selectedProvider)
  const triedEagerRef = useRef(triedEager)
  triedEagerRef.current = triedEager

  const { showWalletModal, openModal, closeModal } = useWalletModal(triedEagerRef.current)

  useInactiveListener(triedEager && !manuallyDisconnected, connect)

  const value = useMemo<WalletContextType>(
    () => ({
      connect,
      disconnect,
      openWalletModal: openModal,
    }),
    [connect, disconnect, openModal]
  )

  return (
    <WalletContext.Provider value={value}>
      <WalletModal closeModal={closeModal} isOpen={showWalletModal} />
      {props.children}
    </WalletContext.Provider>
  )
}

export function useWallet(): WalletContextType {
  return useContext(WalletContext)
}
