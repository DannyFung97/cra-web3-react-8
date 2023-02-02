import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import {
  GeneralManager,
  NotificationsManager,
  WalletManager,
  NetworkManager,
  ProviderManager,
  CacheManager,
} from './context'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GeneralManager>
      <NotificationsManager>
        <WalletManager>
          <NetworkManager>
            <ProviderManager>
              <CacheManager>
                <App />
              </CacheManager>
            </ProviderManager>
          </NetworkManager>
        </WalletManager>
      </NotificationsManager>
    </GeneralManager>
  </React.StrictMode>
)
