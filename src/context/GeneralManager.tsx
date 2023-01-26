import { useLocalStorage } from 'react-use-storage'
import React, { createContext, PropsWithChildren, useCallback, useContext, useMemo, useState } from 'react'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import useOrderedConnections from '../hooks/wallet/useOrderedConnections'
import { lightTheme, darkTheme } from '../styles/themes'
import { ThemeProvider } from 'styled-components'
import { Connection, getConnectionName } from '../wallet'

type GeneralContextType = {
  selectedProvider?: string
  setSelectedProvider: (provider?: string) => void
  removeSelectedProvider: () => void
  handlePathNameChange: (pathname: string) => void
}

const GeneralContext = createContext<GeneralContextType>({
  selectedProvider: undefined,
  setSelectedProvider: () => undefined,
  removeSelectedProvider: () => undefined,
  handlePathNameChange: () => undefined,
})

function GeneralManager(props: PropsWithChildren): JSX.Element {
  const [selectedProvider, setSelectedProvider, removeSelectedProvider] = useLocalStorage<string | undefined>(
    'new_wallet_0'
  )
  const [selectedTheme, setSelectedTheme, removeSelectedTheme] = useLocalStorage<'light' | 'dark' | undefined>(
    'new_data_theme'
  )

  const appTheme: 'light' | 'dark' = selectedTheme ?? 'light'
  const theme = appTheme == 'light' ? lightTheme : darkTheme
  const [pathname, setPathname] = useState('/')

  const connections = useOrderedConnections(selectedProvider)
  const connectors: [Connector, Web3ReactHooks][] = connections.map(({ hooks, connector }) => [connector, hooks])
  const key = useMemo(() => connections.map(({ type }: Connection) => getConnectionName(type)).join('-'), [connections])

  const toggleTheme = useCallback(() => {
    if (appTheme === 'light') {
      setSelectedTheme('dark')
    } else if (appTheme === 'dark') {
      removeSelectedTheme()
    }
  }, [appTheme, removeSelectedTheme, setSelectedTheme])

  const handlePathNameChange = useCallback((pathname: string) => {
    setPathname(pathname)
  }, [])

  const value = useMemo<GeneralContextType>(
    () => ({
      selectedProvider,
      pathname,
      setSelectedProvider,
      removeSelectedProvider,
      handlePathNameChange,
      toggleTheme,
    }),
    [selectedProvider, pathname, setSelectedProvider, removeSelectedProvider, handlePathNameChange, toggleTheme]
  )

  return (
    <Web3ReactProvider connectors={connectors} key={key}>
      <ThemeProvider theme={theme}>
        <GeneralContext.Provider value={value}>{props.children}</GeneralContext.Provider>
      </ThemeProvider>
    </Web3ReactProvider>
  )
}

export function useGeneral(): GeneralContextType {
  return useContext(GeneralContext)
}

export default GeneralManager
