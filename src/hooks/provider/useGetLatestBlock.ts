import { useWeb3React } from '@web3-react/core'
import { useEffect, useRef, useState } from 'react'
import { BlockData } from '../../constants/types'

export const useGetLatestBlock = (): BlockData => {
  const { chainId, provider } = useWeb3React()

  const [blockNumber, setBlockNumber] = useState<number | undefined>(undefined)
  const [blockTimestamp, setBlockTimestamp] = useState<number | undefined>(undefined)
  const running = useRef(false)

  useEffect(() => {
    if (!provider) return
    provider.on('block', async (res: number) => {
      if (running.current) return
      running.current = true
      setBlockNumber(res)
      setBlockTimestamp(Date.now() / 1000)
      running.current = false
    })

    return () => {
      provider.removeAllListeners()
    }
  }, [provider, chainId])

  return { blockNumber, blockTimestamp }
}
