import React, { useMemo, useContext, createContext, useEffect, useCallback, PropsWithChildren, useState } from 'react'
import { useLocalStorage } from 'react-use-storage'
import { useWallet } from './WalletManager'
import { LocalTx } from '../constants/types'
import { useNetwork } from '.'
import { useWeb3React } from '@web3-react/core'
/*

This manager caches data such as the user's pending transactions, policies, token and position data.

Currently, the reload feature takes place in this manager as well, this feature is called and
read by components and hooks across the app to stay in sync with each other. This reload feature
should be called manually, such as when the user sends a transaction.

*/

type CacheContextType = {
  showAccount: boolean
  showNetworks: boolean
  toggleAccount: () => void
  closeAccount: () => void
  toggleNetworks: () => void
  closeNetworks: () => void
  localTransactions: LocalTx[]
  addLocalTransactions: (txToAdd: LocalTx) => void
  deleteLocalTransactions: (txsToDelete: { hash: string }[]) => void
}

const CacheContext = createContext<CacheContextType>({
  showAccount: false,
  showNetworks: false,
  toggleAccount: () => undefined,
  closeAccount: () => undefined,
  toggleNetworks: () => undefined,
  closeNetworks: () => undefined,
  localTransactions: [],
  addLocalTransactions: () => undefined,
  deleteLocalTransactions: () => undefined,
})

export function CacheManager(props: PropsWithChildren): JSX.Element {
  const { account } = useWeb3React()
  const { disconnect } = useWallet()
  const { activeNetwork } = useNetwork()
  const [localTxs, setLocalTxs] = useLocalStorage<LocalTx[]>('new_loc_txs', [])
  const [accountModal, setAccountModal] = useState<boolean>(false)
  const [networkModal, setNetworkModal] = useState<boolean>(false)

  const toggleAccountModal = useCallback(() => {
    setAccountModal(!accountModal)
  }, [accountModal])

  const closeAccountModal = useCallback(() => {
    setAccountModal(false)
  }, [])

  const toggleNetworkModal = useCallback(() => {
    setNetworkModal(!networkModal)
  }, [networkModal])

  const closeNetworkModal = useCallback(() => {
    setNetworkModal(false)
  }, [])

  const addLocalTransactions = useCallback(
    (txToAdd: LocalTx) => {
      setLocalTxs([txToAdd, ...localTxs])
    },
    [localTxs]
  )

  const deleteLocalTransactions = useCallback(
    (txsToDelete: { hash: string }[]) => {
      if (txsToDelete.length == 0) return
      const formattedTxsToDelete = txsToDelete.map((tx) => tx.hash.toLowerCase())
      const passedLocalTxs = localTxs.filter(
        (tx: LocalTx) => !formattedTxsToDelete.includes(tx.hash.toLowerCase()) && tx.status !== 'Complete'
      )
      setLocalTxs(passedLocalTxs)
    },
    [localTxs]
  )

  useEffect(() => {
    const clearLocalTransactions = () => {
      setLocalTxs([])
    }
    clearLocalTransactions()
  }, [disconnect, account, activeNetwork.chainId])

  const value = useMemo<CacheContextType>(
    () => ({
      showAccount: accountModal,
      toggleAccount: toggleAccountModal,
      closeAccount: closeAccountModal,
      showNetworks: networkModal,
      toggleNetworks: toggleNetworkModal,
      closeNetworks: closeNetworkModal,
      localTransactions: localTxs,
      addLocalTransactions,
      deleteLocalTransactions,
    }),
    [
      localTxs,
      addLocalTransactions,
      deleteLocalTransactions,
      accountModal,
      toggleAccountModal,
      closeAccountModal,
      networkModal,
      toggleNetworkModal,
      closeNetworkModal,
    ]
  )

  return <CacheContext.Provider value={value}>{props.children}</CacheContext.Provider>
}

export function useCache(): CacheContextType {
  return useContext(CacheContext)
}
