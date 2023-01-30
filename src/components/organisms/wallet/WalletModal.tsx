/*************************************************************************************

    Table of Contents:

    import packages
    import managers
    import components
    import constants
    import wallets

    WalletModal
      hooks
      local functions

  *************************************************************************************/

/* import packages */
import React, { useCallback, useEffect } from 'react'

/* import managers */
import { useWallet } from '../../../context'

/* import components */
import { Modal } from '../../molecules/Modal'
// import { Button, ButtonWrapper } from '../../atoms/Button'
import { Scrollable } from '../../atoms/Scrollable'

/* import constants */
// import { Z_MODAL } from '../../../constants'

/* import wallets */
import { WalletList } from '../../molecules/WalletList'
import { useWeb3React } from '@web3-react/core'
import usePrevious from '../../../hooks/internal/usePrevious'

interface WalletModalProps {
  closeModal: () => void
  isOpen: boolean
}

export const WalletModal: React.FC<WalletModalProps> = ({ closeModal, isOpen }) => {
  /************************************************************************************* 
    
  hooks

  *************************************************************************************/
  const { connector, isActive, account } = useWeb3React()
  const { disconnect } = useWallet()

  /************************************************************************************* 
    
  local functions

  *************************************************************************************/
  const handleClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  const activePrevious = usePrevious(isActive)
  const connectorPrevious = usePrevious(connector)

  // if the user is inactive, then became active
  // or if the connector is different, close modal
  useEffect(() => {
    if ((isActive && !activePrevious) || (connector && connector !== connectorPrevious)) {
      handleClose()
    }
  }, [isActive, activePrevious, handleClose, connector, connectorPrevious])

  return (
    <Modal handleClose={handleClose} isOpen={isOpen}>
      <Scrollable maxMobileHeight={'60vh'}>
        <WalletList />
      </Scrollable>
      {account && (
        <div>
          <button onClick={disconnect}>Disconnect Wallet</button>
        </div>
      )}
    </Modal>
  )
}
