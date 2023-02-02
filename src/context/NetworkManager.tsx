import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo } from 'react'
import { Network } from '../constants/types'

/* networks */
import { useWeb3React } from '@web3-react/core'
import { hexStripZeros } from 'ethers/lib/utils'
import { BigNumber } from 'ethers'
import { NETWORKS } from '../constants/networks'

/*

This manager keeps track of the current network and other important information.

*/

export const networksMapping = NETWORKS.reduce((configs: any, networkConfig: Network) => ({
  ...configs,
  [networkConfig.chainId]: networkConfig,
}))

type NetworkContextType = {
  activeNetwork: Network
  findNetworkByChainId: (chainId: number | undefined) => Network | undefined
  changeNetwork: (targetChain: number) => Promise<void>
}

const NetworkContext = createContext<NetworkContextType>({
  activeNetwork: NETWORKS[0],
  findNetworkByChainId: () => undefined,
  changeNetwork: () => Promise.reject(),
})

export function NetworkManager(props: PropsWithChildren): JSX.Element {
  const { chainId, provider: library, account, connector } = useWeb3React()
  const [unconnectedChainId, setUnconnectedChainId] = React.useState<number | undefined>(undefined)

  const findNetworkByChainId = useCallback((chainId: number | undefined): Network | undefined => {
    if (chainId == undefined) return undefined
    return NETWORKS.find((network) => network.chainId == chainId)
  }, [])

  const activeNetwork = useMemo(() => {
    const netConfig = findNetworkByChainId(chainId)
    const unconnectedNetConfig = findNetworkByChainId(unconnectedChainId)
    return netConfig ?? unconnectedNetConfig ?? NETWORKS[0]
  }, [chainId, unconnectedChainId, findNetworkByChainId])

  const changeNetwork = useCallback(
    async (targetChain: number) => {
      const switchToNetwork = async (targetChain: number) => {
        if (!library?.provider?.request) {
          setUnconnectedChainId(targetChain)
          return
        }

        const formattedChainId = hexStripZeros(BigNumber.from(targetChain).toHexString())
        try {
          await library.provider
            .request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: formattedChainId }],
            })
            .then(() => {
              setUnconnectedChainId(undefined)
            })
        } catch (error: any) {
          // 4902 is the error code for attempting to switch to an unrecognized chainId
          if (error.code === 4902) {
            const netConfig = findNetworkByChainId(targetChain)
            if (!netConfig || !netConfig.metamaskChain) return

            await library.provider.request({
              method: 'wallet_addEthereumChain',
              params: [{ ...netConfig.metamaskChain }],
            })
            // metamask (only known implementer) automatically switches after a network is added
            // the second call is done here because that behavior is not a part of the spec and cannot be relied upon in the future
            // metamask's behavior when switching to the current network is just to return null (a no-op)
            try {
              await library.provider
                .request({
                  method: 'wallet_switchEthereumChain',
                  params: [{ chainId: formattedChainId }],
                })
                .then(() => {
                  setUnconnectedChainId(undefined)
                })
            } catch (error) {
              console.debug('Added network but could not switch chains', error)
            }
          } else {
            throw error
          }
        }
      }

      switchToNetwork(targetChain).catch((error) => {
        console.error('Failed to switch network', error)
      })
    },
    [findNetworkByChainId, library]
  )

  useEffect(() => {
    if (account) setUnconnectedChainId(undefined)
  }, [account])

  const value = useMemo<NetworkContextType>(
    () => ({
      activeNetwork,
      findNetworkByChainId,
      changeNetwork,
    }),
    [activeNetwork, findNetworkByChainId, changeNetwork]
  )

  return <NetworkContext.Provider value={value}>{props.children}</NetworkContext.Provider>
}

export function useNetwork(): NetworkContextType {
  return useContext(NetworkContext)
}
