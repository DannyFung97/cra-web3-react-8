import { useState, useEffect, useCallback, useRef, useMemo } from 'react'
import { GasData } from '../../constants/types'
import { getGasValue } from '../../utils/formatting'
import { useWeb3React } from '@web3-react/core'
import { SUPPORTED_WALLETS } from '../../wallet'
import { formatUnits } from 'ethers/lib/utils'
import { ZERO } from '../../constants'
import axios from 'axios'
import { GasConfiguration } from '../../constants/types/gas'
import { useGeneral, useProvider, useNetwork } from '../../context'
import { StaticJsonRpcProvider, JsonRpcProvider } from '@ethersproject/providers'

export const useFetchGasData = (provider: JsonRpcProvider | StaticJsonRpcProvider): GasData | undefined => {
  const { activeNetwork } = useNetwork()
  const { clock } = useGeneral()
  const running = useRef(false)
  const [gasData, setGasData] = useState<GasData | undefined>(undefined)

  useEffect(() => {
    const fetchGasData = async () => {
      running.current = true
      let data: { gasPrice: number; maxFeePerGas: number; maxPriorityFeePerGas: number } = {
        gasPrice: 0,
        maxFeePerGas: 0,
        maxPriorityFeePerGas: 0,
      }
      await provider.getFeeData().then((result) => {
        const gasPriceStr = formatUnits(result.gasPrice ?? ZERO, 'gwei')
        const gasPrice = Math.ceil(parseFloat(gasPriceStr))

        const maxFeePerGasStr = formatUnits(result.maxFeePerGas ?? ZERO, 'gwei')
        const maxFeePerGas = Math.ceil(parseFloat(maxFeePerGasStr))

        const maxPriorityFeePerGasStr = formatUnits(result.maxPriorityFeePerGas ?? ZERO, 'gwei')
        const maxPriorityFeePerGas = Math.ceil(parseFloat(maxPriorityFeePerGasStr))

        data = { gasPrice, maxFeePerGas, maxPriorityFeePerGas }
      })
      if (activeNetwork.chainId === 137) {
        const maticGasData = await axios.get(`https://gasstation-mainnet.matic.network/v2`)
        data = {
          ...data,
          maxFeePerGas: maticGasData.data.standard.maxFee,
          maxPriorityFeePerGas: maticGasData.data.standard.maxPriorityFee,
        }
      }
      setGasData(data)
      running.current = false
    }
    if (running.current) return

    fetchGasData()
  }, [activeNetwork, clock.minute, provider])

  return gasData
}

export const useGetFunctionGas = () => {
  const { activeNetwork } = useNetwork()
  const { connector } = useWeb3React()
  const { gasData } = useProvider()

  const getGasConfig = useCallback(
    (_gasValue: number | undefined): GasConfiguration => {
      // null check and testnet check
      const gasValue = _gasValue ?? gasData?.gasPrice

      const activeWalletConnector = SUPPORTED_WALLETS.find((w) => w.connector === connector)

      if (!activeWalletConnector || activeNetwork.isTestnet || !gasValue || !gasData) {
        return {}
      }

      // type 2 transaction
      if (activeWalletConnector.supportedTxTypes.includes(2) && activeNetwork.supportedTxTypes.includes(2))
        return {
          maxFeePerGas: getGasValue(gasData.maxFeePerGas),
          maxPriorityFeePerGas: getGasValue(gasData.maxPriorityFeePerGas),
          type: 2,
        }

      // legacy type 0 transaction
      return {
        gasPrice: getGasValue(gasValue),
      }
    },
    [activeNetwork, connector, gasData]
  )

  const getAutoGasConfig = useCallback((): GasConfiguration => getGasConfig(undefined), [getGasConfig])

  const gasConfig = useMemo(() => getAutoGasConfig(), [getAutoGasConfig])

  return { gasConfig, getGasConfig, getAutoGasConfig }
}
