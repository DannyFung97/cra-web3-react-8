import React, { useState, useEffect, useCallback, useMemo, createContext, useContext, PropsWithChildren } from 'react'
import { useNetwork } from './NetworkManager'
import { ModalCell } from '../components/atoms/Modal'
import { Modal } from '../components/molecules/Modal'

import { useGetLatestBlock } from '../hooks/provider/useGetLatestBlock'
import ToggleSwitch from '../components/atoms/ToggleSwitch/ToggleSwitch'
import { StaticJsonRpcProvider, JsonRpcSigner } from '@ethersproject/providers'
import { useWeb3React } from '@web3-react/core'
import { getSigner } from '../utils'
import { BlockData, GasData, Network } from '../constants/types'
import { Scrollable } from '../components/atoms/Scrollable'
import { NETWORKS, RPC_PROVIDERS } from '../constants/networks'
import { useFetchGasData } from '../hooks/provider/useGas'

/*

This Manager initializes the Web3 provider and the JSON-RPC provider.

These two providers utilize the ethers library, which makes a strong distinction between
Providers and Signers. The Provider is a read-only abstraction to access blockchain data, while 
Signer is an abstraction that allows for executing state-changing operations.

Please refer to the Ethers documentation for more details.

The reason why two providers are employed at the moment is anchored on
whether the user connected their wallet. If they didn't, we use the JsonRpcProvider that taps into 
Alchemy to retrieve data, else, we use Web3Provider that can retrieve data, interact with the user's wallet, 
and write to the blockchain.

*/

type ProviderContextType = {
  provider: StaticJsonRpcProvider
  signer?: JsonRpcSigner
  openNetworkModal: () => void
  latestBlock: BlockData
  gasData: GasData | undefined
}

const ProviderContext = createContext<ProviderContextType>({
  provider: RPC_PROVIDERS[1],
  signer: undefined,
  openNetworkModal: () => undefined,
  latestBlock: {
    blockNumber: undefined,
    blockTimestamp: undefined,
  },
  gasData: undefined,
})

export function ProviderManager(props: PropsWithChildren): JSX.Element {
  const { account, provider: library } = useWeb3React()
  const { activeNetwork, changeNetwork } = useNetwork()
  const provider = useMemo(() => RPC_PROVIDERS[activeNetwork.chainId], [activeNetwork.chainId])
  const signer = useMemo(() => (account && library ? getSigner(library, account) : undefined), [library, account])
  const { blockNumber, blockTimestamp } = useGetLatestBlock()
  const gasData = useFetchGasData(provider)

  const [networkModal, setNetworkModal] = useState<boolean>(false)
  const [showTestnets, setShowTestnets] = useState<boolean>(true)

  const adjustedNetworks = useMemo(() => {
    const sortedNetworks = NETWORKS.sort((a: Network, b: Network) => {
      return a.isTestnet === b.isTestnet ? 0 : a.isTestnet ? 1 : -1
    })
    return showTestnets ? sortedNetworks : sortedNetworks.filter((n: Network) => !n.isTestnet)
  }, [showTestnets])

  const openModal = useCallback(() => {
    document.body.style.overflowY = 'hidden'
    setNetworkModal(true)
  }, [])

  const closeModal = useCallback(() => {
    document.body.style.overflowY = 'scroll'
    setNetworkModal(false)
  }, [])

  useEffect(() => {
    closeModal()
  }, [activeNetwork.chainId])

  const value = React.useMemo(
    () => ({
      provider,
      signer,
      openNetworkModal: openModal,
      latestBlock: {
        blockNumber,
        blockTimestamp,
      },
      gasData,
    }),
    [openModal, blockNumber, blockTimestamp, provider, signer, gasData]
  )

  return (
    <ProviderContext.Provider value={value}>
      <Modal handleClose={closeModal} isOpen={networkModal}>
        <div>
          <h3>When connected, ensure that the </h3>
          <h3>network on your wallet matches </h3>
          <h3>the network on this app. </h3>
        </div>
        {/* <div>
          <div>
            <h3>Show Test Networks</h3>
          </div>
          <div>
            <ToggleSwitch
              id="show-testnets"
              toggled={showTestnets}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setShowTestnets(e.target.checked)}
            />
          </div>
        </div> */}
        <Scrollable maxMobileHeight={'60vh'}>
          <div>
            {adjustedNetworks.map((network: Network) => (
              <div key={network.name} onClick={() => changeNetwork(network.chainId)} style={{ display: 'flex' }}>
                <div>
                  <ModalCell>
                    <h3>{network.name}</h3>
                  </ModalCell>
                </div>
              </div>
            ))}
          </div>
        </Scrollable>
      </Modal>
      {props.children}
    </ProviderContext.Provider>
  )
}

export function useProvider(): ProviderContextType {
  return useContext(ProviderContext)
}
