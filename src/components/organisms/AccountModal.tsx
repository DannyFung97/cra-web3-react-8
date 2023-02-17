import React from 'react'
import makeBlockie from 'ethereum-blockies-base64'
import { ExplorerscanApi } from '../../constants/enums'
import { useGeneral } from '../../context'
import { useNetwork } from '../../context/NetworkManager'
import { Modal } from '../molecules/Modal'
import { Button } from '../atoms/Button'
import { HyperLink } from '../atoms/Link'
import { WalletConnectButton } from '../molecules/WalletConnectButton'
import { NetworkConnectButton } from '../molecules/NetworkConnectButton'
import { UserImage } from '../molecules/UserImage'
import { CopyButton } from '../molecules/CopyButton'
import { getExplorerItemUrl } from '../../utils/explorer'
import { capitalizeFirstLetter, shortenAddress } from '../../utils'
import { Tdiv } from '../atoms/Text'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { useWeb3React } from '@web3-react/core'
import { useENS } from '../../hooks/wallet/useENS'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { ConnectionType, getConnectionName, SUPPORTED_WALLETS } from '../../wallet'
import { ModalProps } from '../atoms/Modal'
import { RecentActivityTable } from './RecentActivityTable'

export const AccountModal: React.FC<ModalProps> = (props) => {
  /*************************************************************************************
  hooks
  *************************************************************************************/

  const { selectedProvider } = useGeneral()
  const { activeNetwork } = useNetwork()
  const { account, connector } = useWeb3React()
  const { isMobile } = useWindowDimensions()
  const name = useENS()

  return (
    <Modal {...props}>
      <Flex col={isMobile} gap={10} mb={10}>
        {account && selectedProvider && (
          <Card col>
            <Flex justifyCenter mb={15} gap={10}>
              <UserImage width={30} height={30} style={{ display: 'inline-flex', verticalAlign: 'bottom' }}>
                <img src={makeBlockie(account)} alt={'account'} />
              </UserImage>
              <Tdiv t2 bold>
                {name ?? shortenAddress(account)}
              </Tdiv>
              <CopyButton toCopy={account} objectName={''} />
            </Flex>
            <Flex col={isMobile} gap={10}>
              <HyperLink
                href={getExplorerItemUrl(activeNetwork.explorer.url, account, ExplorerscanApi.ADDRESS)}
                target="_blank"
                rel="noopener noreferrer"
                style={{ width: '100%' }}
              >
                <Button widthP={100} style={{ whiteSpace: 'nowrap' }}>
                  View on {activeNetwork.explorer.name}
                </Button>
              </HyperLink>
            </Flex>
          </Card>
        )}
        <Card col>
          <Flex around>
            <Flex col>
              <Tdiv t6>Wallet</Tdiv>
              <Tdiv t1 bold nowrap>
                {account
                  ? getConnectionName(SUPPORTED_WALLETS.find((c) => c.connector === connector)?.type as ConnectionType)
                  : 'Not Connected'}
              </Tdiv>
            </Flex>
            <Flex col>
              <Tdiv t6>Network</Tdiv>
              <Tdiv t1 bold nowrap>
                {capitalizeFirstLetter(activeNetwork.name)}
              </Tdiv>
            </Flex>
          </Flex>
          <Flex mt={15} mb={5} col={isMobile} gap={10}>
            <WalletConnectButton widthP={100} />
            <NetworkConnectButton widthP={100} />
          </Flex>
        </Card>
      </Flex>
      {account && (
        <>
          <Tdiv t2 bold mb={10}>
            Recent Transactions
          </Tdiv>
          <RecentActivityTable />
        </>
      )}
    </Modal>
  )
}
