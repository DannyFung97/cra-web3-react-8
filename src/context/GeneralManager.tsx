import { useLocalStorage } from 'react-use-storage'
import React, { createContext, PropsWithChildren, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { Web3ReactHooks, Web3ReactProvider } from '@web3-react/core'
import { Connector } from '@web3-react/types'
import useOrderedConnections from '../hooks/wallet/useOrderedConnections'
import { lightTheme, darkTheme } from '../styles/themes'
import { ThemeProvider } from 'styled-components'
import { Connection, getConnectionName } from '../wallet'
import { useReload } from '../hooks'

type GeneralContextType = {
  selectedProvider?: string
  pathname: string
  appTheme: 'light' | 'dark'
  clock: {
    positiveVersion: number
    negativeVersion: number
    minute: number
    positiveReload: () => void
    negativeReload: () => void
  }
  setSelectedProvider: (provider?: string) => void
  removeSelectedProvider: () => void
  handlePathNameChange: (pathname: string) => void
  toggleTheme: () => void
}

const GeneralContext = createContext<GeneralContextType>({
  selectedProvider: undefined,
  pathname: '/',
  appTheme: 'light',
  clock: {
    positiveVersion: 0,
    negativeVersion: 0,
    minute: 0,
    positiveReload: () => undefined,
    negativeReload: () => undefined,
  },
  setSelectedProvider: () => undefined,
  removeSelectedProvider: () => undefined,
  handlePathNameChange: () => undefined,
  toggleTheme: () => undefined,
})

export function GeneralManager(props: PropsWithChildren): JSX.Element {
  const [selectedProvider, setSelectedProvider, removeSelectedProvider] = useLocalStorage<string | undefined>(
    'new_wallet_0'
  )
  const [selectedTheme, setSelectedTheme, removeSelectedTheme] = useLocalStorage<'light' | 'dark' | undefined>(
    'new_data_theme'
  )

  const appTheme: 'light' | 'dark' = selectedTheme ?? 'light'
  const theme = appTheme == 'light' ? lightTheme : darkTheme
  const [pathname, setPathname] = useState('/')

  const [positiveReload, positiveVersion] = useReload()
  const [negativeReload, negativeVersion] = useReload()
  const [minReload, minute] = useReload()

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

  useEffect(() => {
    const interval = setInterval(() => {
      minReload()
    }, 60000)
    return () => clearInterval(interval)
  }, [])

  const value = useMemo<GeneralContextType>(
    () => ({
      selectedProvider,
      pathname,
      clock: {
        positiveVersion,
        negativeVersion,
        minute,
        positiveReload,
        negativeReload,
      },
      appTheme,
      setSelectedProvider,
      removeSelectedProvider,
      handlePathNameChange,
      toggleTheme,
    }),
    [
      selectedProvider,
      pathname,
      appTheme,
      setSelectedProvider,
      removeSelectedProvider,
      handlePathNameChange,
      toggleTheme,
      positiveVersion,
      negativeVersion,
      minute,
      positiveReload,
      negativeReload,
    ]
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
