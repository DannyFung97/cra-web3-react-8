import React, { useCallback } from 'react'
import { useWallet } from '../../context'
import { CONNECTION_TYPE_TO_CONNECTION, SELECTABLE_WALLETS } from '../../wallet'
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
        <div onClick={() => connectWallet(SELECTABLE_WALLETS[0].type)} style={{ display: 'flex' }}>
          <div>
            <ModalCell>
              <img src={SELECTABLE_WALLETS[0].logo} alt={SELECTABLE_WALLETS[0].name} height={32} />
            </ModalCell>
          </div>
        </div>
        {SELECTABLE_WALLETS.filter((w) => w.type != 'INJECTED').map((wallet) => (
          <div key={wallet.type} onClick={() => connectWallet(wallet.type)} style={{ display: 'flex' }}>
            <div>
              <ModalCell>
                <img src={wallet.logo} alt={wallet.name} height={32} />
              </ModalCell>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
