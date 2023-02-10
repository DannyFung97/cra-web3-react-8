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
import { RiskMarketManager } from './context/RiskMarketManager'
import { BrowserRouter } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <GeneralManager>
      <NotificationsManager>
        <WalletManager>
          <NetworkManager>
            <ProviderManager>
              <CacheManager>
                <RiskMarketManager>
                  <BrowserRouter>
                    <App />
                  </BrowserRouter>
                </RiskMarketManager>
              </CacheManager>
            </ProviderManager>
          </NetworkManager>
        </WalletManager>
      </NotificationsManager>
    </GeneralManager>
  </React.StrictMode>
)
