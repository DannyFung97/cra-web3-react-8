import React from 'react'
import './App.css'
import { Home } from './pages/Home'

import {
  WalletManager,
  GeneralManager,
  NetworkManager,
  ProviderManager,
  NotificationsManager,
  CacheManager,
} from './context'
import { Buffer } from 'buffer'

window.Buffer = window.Buffer || Buffer

function App(): JSX.Element {
  return (
    <GeneralManager>
      <NotificationsManager>
        <WalletManager>
          <NetworkManager>
            <ProviderManager>
              <CacheManager>
                <Home />
              </CacheManager>
            </ProviderManager>
          </NetworkManager>
        </WalletManager>
      </NotificationsManager>
    </GeneralManager>
  )
}

export default App
