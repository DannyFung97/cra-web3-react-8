/* import react */
import React from 'react'

/* import managers */
import { useProvider } from '../../context/ProviderManager'

/* import constants */

/* import components */
import { Button, ButtonProps } from '../atoms/Button'
import { StyledNetworkChart } from '../atoms/Icon'
import { GeneralProps } from '../general'

/* import hooks */

export const NetworkConnectButton: React.FC<GeneralProps & ButtonProps> = ({ ...props }) => {
  /*************************************************************************************
    hooks
  *************************************************************************************/
  const { openNetworkModal } = useProvider()

  return (
    <>
      <Button inquiry onClick={() => openNetworkModal()} {...props} style={{ whiteSpace: 'nowrap' }}>
        <StyledNetworkChart size={20} />
        Switch Network
      </Button>
    </>
  )
}
