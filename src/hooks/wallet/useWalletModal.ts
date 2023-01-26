import { useCallback, useRef, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
export const useWalletModal = (web3Initialized: boolean) => {
  const { account } = useWeb3React()
  const [showWalletModal, setShowWalletModal] = useState<boolean>(false)

  const accountRef = useRef(account)
  accountRef.current = account

  const web3InitializedRef = useRef(web3Initialized)
  web3InitializedRef.current = web3Initialized

  const openModal = useCallback(() => {
    document.body.style.overflowY = 'hidden'
    setShowWalletModal(true)
  }, [])

  const closeModal = useCallback(() => {
    document.body.style.overflowY = 'scroll'
    setShowWalletModal(false)
  }, [])

  return { showWalletModal, openModal, closeModal }
}
