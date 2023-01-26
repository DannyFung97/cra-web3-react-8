import React from 'react'
import './App.css'
import WalletManager from './context/WalletManager'
import GeneralManager from './context/GeneralManager'
import NetworkManager from './context/NetworkManager'
import { Home } from './pages/Home'
import ProviderManager from './context/ProviderManager'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer || Buffer

function App(): JSX.Element {
  return (
    <GeneralManager>
      <WalletManager>
        <NetworkManager>
          <ProviderManager>
            <Home />
          </ProviderManager>
        </NetworkManager>
      </WalletManager>
    </GeneralManager>
  )
}

export default App
