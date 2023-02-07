import React, { useMemo, useContext, createContext, useEffect, useCallback, PropsWithChildren, useState } from 'react'
import { useLocalStorage } from 'react-use-storage'
import { useWallet } from './WalletManager'

import { LocalTx } from '../constants/types'
import { useNetwork } from '.'
import { useWeb3React } from '@web3-react/core'
import { AccountModal } from '../components/organisms/AccountModal'
/*

This manager caches data such as the user's pending transactions, policies, token and position data.

Currently, the reload feature takes place in this manager as well, this feature is called and
read by components and hooks across the app to stay in sync with each other. This reload feature
should be called manually, such as when the user sends a transaction.

*/

type CacheContextType = {
  showAccountModal: boolean
  openAccountModal: () => void
  localTransactions: LocalTx[]
  addLocalTransactions: (txToAdd: LocalTx) => void
  deleteLocalTransactions: (txsToDelete: { hash: string }[]) => void
}

const CacheContext = createContext<CacheContextType>({
  showAccountModal: false,
  openAccountModal: () => undefined,
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

  const openModal = useCallback(() => {
    document.body.style.overflowY = 'hidden'
    setAccountModal(true)
  }, [])

  const closeModal = useCallback(() => {
    document.body.style.overflowY = 'scroll'
    setAccountModal(false)
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
      showAccountModal: accountModal,
      openAccountModal: openModal,
      localTransactions: localTxs,
      addLocalTransactions,
      deleteLocalTransactions,
    }),
    [localTxs, addLocalTransactions, deleteLocalTransactions]
  )

  return (
    <CacheContext.Provider value={value}>
      <AccountModal
        handleClose={closeModal}
        isOpen={accountModal}
        modalTitle={'My Account'}
        disableCloseButton={false}
      />
      {props.children}
    </CacheContext.Provider>
  )
}

export function useCache(): CacheContextType {
  return useContext(CacheContext)
}
