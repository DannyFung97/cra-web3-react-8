/* import react */
import { useWeb3React } from '@web3-react/core'
import React from 'react'

/* import managers */
import { useWallet } from '../../context/WalletManager'

/* import constants */

/* import components */
import { Button, ButtonProps } from '../atoms/Button'
import { StyledWallet } from '../atoms/Icon'
import { GeneralProps } from '../general'

/* import hooks */

export const WalletConnectButton: React.FC<GeneralProps & ButtonProps> = ({ ...props }) => {
  /*************************************************************************************
   hooks
  *************************************************************************************/
  const { openWalletModal } = useWallet()
  const { isActive } = useWeb3React()

  return (
    <>
      <Button inquiry onClick={() => openWalletModal()} {...props}>
        <StyledWallet size={20} />
        {isActive ? 'Switch Wallet' : 'Connect Wallet'}
      </Button>
    </>
  )
}
