import React, { useCallback } from 'react'
import { useWallet } from '../../context'
import { CONNECTION_TYPE_TO_CONNECTION, SELECTABLE_WALLETS } from '../../wallet'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
// import { Flex } from '../atoms/Layout'
// import { Text } from '../atoms/Typography'
import { ModalCell } from '../atoms/Modal'

export const WalletList = () => {
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
      <div style={{ margin: 'auto' }}>
        <Card
          px={30}
          py={5}
          canHover
          onClick={() => connectWallet(SELECTABLE_WALLETS[0].type)}
          style={{ display: 'flex' }}
        >
          <Flex stretch between>
            <ModalCell>
              <img src={SELECTABLE_WALLETS[0].logo} alt={SELECTABLE_WALLETS[0].name} height={32} />
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
            style={{ display: 'flex' }}
          >
            <Flex stretch between>
              <ModalCell>
                <img src={wallet.logo} alt={wallet.name} height={32} />
              </ModalCell>
            </Flex>
          </Card>
        ))}
      </div>
    </>
  )
}
