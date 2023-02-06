import React, { useCallback } from 'react'
import makeBlockie from 'ethereum-blockies-base64'
import { BKPT_TABLET_END, Z_TABLE } from '../../constants'
import { ExplorerscanApi } from '../../constants/enums'
import { useCache, useGeneral } from '../../context'
import { useNetwork } from '../../context/NetworkManager'
import { Modal } from '../molecules/Modal'
import { Button } from '../atoms/Button'
import { HyperLink } from '../atoms/Link'
import { Loader } from '../atoms/Loader'
import { Table, TableHead, TableHeader, TableRow, TableBody, TableData } from '../atoms/Table'
import { WalletConnectButton } from '../molecules/WalletConnectButton'
import { NetworkConnectButton } from '../molecules/NetworkConnectButton'
import { UserImage } from '../molecules/UserImage'
import { CopyButton } from '../molecules/CopyButton'
import { getExplorerItemUrl } from '../../utils/explorer'
import { timeAgo } from '../../utils/time'
import { capitalizeFirstLetter, shortenAddress } from '../../utils'
import { Tdiv } from '../atoms/Text'
import { Scrollable } from '../atoms/Scroll'
import { CardContainer, Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { useWeb3React } from '@web3-react/core'
import { useENS } from '../../hooks/wallet/useENS'
import { decodeInput } from '../../utils/decoder'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { useFetchTxHistoryByAddress } from '../../hooks/api/useTransactionHistory'
import { SmallerInputSection } from '../molecules/InputSection'
import { useContracts } from '../../context/ContractsManager'
import { ConnectionType, getConnectionName, SUPPORTED_WALLETS } from '../../wallet'

interface AccountModalProps {
  closeModal: () => void
  isOpen: boolean
}

export const AccountModal: React.FC<AccountModalProps> = ({ closeModal, isOpen }) => {
  /*************************************************************************************
  hooks
  *************************************************************************************/

  const { selectedProvider } = useGeneral()
  const { activeNetwork } = useNetwork()
  const { localTransactions } = useCache()
  const { contractSources } = useContracts()
  const { account, connector } = useWeb3React()
  const { width, isMobile } = useWindowDimensions()
  const txHistory = useFetchTxHistoryByAddress()
  const name = useENS()
  /************************************************************************************* 
    
  local functions
  *************************************************************************************/
  const handleClose = useCallback(() => {
    closeModal()
  }, [closeModal])

  return (
    <Modal handleClose={handleClose} isOpen={isOpen} modalTitle={'My Account'} disableCloseButton={false}>
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
              <Tdiv t4>Wallet</Tdiv>
              <Tdiv big3 bold nowrap>
                {account
                  ? getConnectionName(SUPPORTED_WALLETS.find((c) => c.connector === connector)?.type as ConnectionType)
                  : 'Not Connected'}
              </Tdiv>
            </Flex>
            <Flex col>
              <Tdiv t4>Network</Tdiv>
              <Tdiv big3 bold nowrap>
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
          <Scrollable p={0} maxDesktopHeight={'30vh'}>
            <Table textAlign="center" style={{ borderSpacing: '0px 7px' }}>
              <TableHead sticky zIndex={Z_TABLE + 1}>
                <TableRow>
                  <TableHeader>Type</TableHeader>
                  {width > BKPT_TABLET_END && (
                    <>
                      {/* <TableHeader>Content</TableHeader> */}
                      <TableHeader>Time</TableHeader>
                    </>
                  )}
                  <TableHeader>Hash</TableHeader>
                </TableRow>
              </TableHead>
              <TableBody>
                {localTransactions.map((pendingtx: any) => (
                  <TableRow key={pendingtx.hash}>
                    <TableData pl={isMobile ? 0 : undefined} pr={isMobile ? 0 : undefined} pt={5} pb={5} t4>
                      <Tdiv>{pendingtx.type}</Tdiv>
                    </TableData>
                    {width > BKPT_TABLET_END && (
                      <>
                        <TableData pt={5} pb={5} t4>
                          <Tdiv>{timeAgo(Number(Date.now()) * 1000)}</Tdiv>
                        </TableData>
                      </>
                    )}
                    <TableData pt={5} pb={5} t4 pl={isMobile ? 0 : undefined} pr={isMobile ? 0 : undefined}>
                      <HyperLink
                        href={getExplorerItemUrl(activeNetwork.explorer.url, pendingtx.hash, ExplorerscanApi.TX)}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Button>{shortenAddress(pendingtx.hash)}</Button>
                      </HyperLink>
                    </TableData>
                  </TableRow>
                ))}
                {txHistory &&
                  txHistory.map((tx: any) => (
                    <TableRow key={tx.hash}>
                      <TableData t4 pt={5} pb={5} pl={isMobile ? 0 : undefined} pr={isMobile ? 0 : undefined}>
                        {txHistory.length > 0 ? (
                          <Tdiv error={tx.txreceipt_status != '1'}>
                            {capitalizeFirstLetter(decodeInput(tx, contractSources)?.name ?? '?')}
                          </Tdiv>
                        ) : (
                          <Loader width={10} height={10} />
                        )}
                      </TableData>
                      {width > BKPT_TABLET_END && (
                        <TableData pt={5} pb={5} t4>
                          {txHistory.length > 0 && (
                            <Tdiv error={tx.txreceipt_status != '1'}>{timeAgo(Number(tx.timeStamp) * 1000)}</Tdiv>
                          )}
                        </TableData>
                      )}
                      <TableData t4 pt={5} pb={5} pl={isMobile ? 0 : undefined} pr={isMobile ? 0 : undefined}>
                        {txHistory.length > 0 && (
                          <HyperLink
                            href={getExplorerItemUrl(activeNetwork.explorer.url, tx.hash, ExplorerscanApi.TX)}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Button>{shortenAddress(tx.hash)} </Button>
                          </HyperLink>
                        )}
                      </TableData>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Scrollable>
        </>
      )}
    </Modal>
  )
}
