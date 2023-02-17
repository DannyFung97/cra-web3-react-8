import React from 'react'
import { Z_TABLE, BKPT_TABLET_END } from '../../constants'
import { ExplorerscanApi } from '../../constants/enums'
import { useNetwork, useCache } from '../../context'
import { useContracts } from '../../context/ContractsManager'
import { useFetchTxHistoryByAddress } from '../../hooks/api/useTransactionHistory'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { timeAgo, getExplorerItemUrl, shortenAddress, capitalizeFirstLetter } from '../../utils'
import { decodeInput } from '../../utils/decoder'
import { Button } from '../atoms/Button'
import { HyperLink } from '../atoms/Link'
import { Loader } from '../atoms/Loader'
import { Scrollable } from '../atoms/Scroll'
import { Table, TableHead, TableRow, TableHeader, TableBody, TableData } from '../atoms/Table'
import { Tdiv } from '../atoms/Text'

export function RecentActivityTable() {
  const { activeNetwork } = useNetwork()
  const { localTransactions } = useCache()
  const { contractSources } = useContracts()
  const { width, isMobile } = useWindowDimensions()
  const txHistory = useFetchTxHistoryByAddress()

  return (
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
  )
}
