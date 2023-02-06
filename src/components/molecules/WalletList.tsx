import React, { useCallback } from 'react'
import { useWallet } from '../../context'
import { CONNECTION_TYPE_TO_CONNECTION, SELECTABLE_WALLETS } from '../../wallet'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { ModalCell } from '../atoms/Modal'
import { Tdiv } from '../atoms/Text'
import { getConnectionName } from '../../wallet'
import { useWeb3React } from '@web3-react/core'

export const WalletList = () => {
  const { connector } = useWeb3React()
  const { connect } = useWallet()

  const connectWallet = useCallback(
    async (id: string) => {
      const foundWalletConnection = CONNECTION_TYPE_TO_CONNECTION[id]
      if (!foundWalletConnection) return
      await connect(foundWalletConnection)
    },
    [connect]
  )

  return (
    <>
      <Flex col style={{ margin: 'auto' }} gap={10}>
        <Card
          px={30}
          py={5}
          canHover
          onClick={() => connectWallet(SELECTABLE_WALLETS[0].type)}
          info={SELECTABLE_WALLETS[0].connector == connector}
        >
          <Flex stretch between>
            <ModalCell p={10}>
              <img src={SELECTABLE_WALLETS[0].logo} alt={SELECTABLE_WALLETS[0].name} height={32} />
            </ModalCell>
            <ModalCell p={10}>
              <Tdiv t4 bold>
                {getConnectionName(SELECTABLE_WALLETS[0].type)}
              </Tdiv>
            </ModalCell>
          </Flex>
        </Card>
        {SELECTABLE_WALLETS.filter((w) => w.type != 'INJECTED').map((wallet) => (
          <Card
            px={30}
            py={5}
            canHover
            key={wallet.type}
            onClick={() => connectWallet(wallet.type)}
            info={wallet.connector == connector}
          >
            <Flex stretch between>
              <ModalCell p={10}>
                <img src={wallet.logo} alt={wallet.name} height={32} />
              </ModalCell>
              <ModalCell p={10}>
                <Tdiv t4 bold>
                  {wallet.name}
                </Tdiv>
              </ModalCell>
            </Flex>
          </Card>
        ))}
      </Flex>
    </>
  )
}
