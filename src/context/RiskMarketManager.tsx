import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'

type RiskMarketContextType = {
  isBuyer: boolean
  handleBuyer: (isBuyer: boolean) => void
}

const RiskMarketManagerContext = createContext<RiskMarketContextType>({
  isBuyer: false,
  handleBuyer: () => undefined,
})

export function RiskMarketManager(props: PropsWithChildren): JSX.Element {
  const [isBuyer, setIsBuyer] = useState(false)

  const handleBuyer = useCallback((_isBuyer: boolean) => {
    setIsBuyer(_isBuyer)
  }, [])

  const value = useMemo<RiskMarketContextType>(
    () => ({
      isBuyer,
      handleBuyer,
    }),
    [isBuyer, handleBuyer]
  )

  return <RiskMarketManagerContext.Provider value={value}>{props.children}</RiskMarketManagerContext.Provider>
}

export function useRiskMarket(): RiskMarketContextType {
  return useContext(RiskMarketManagerContext)
}
