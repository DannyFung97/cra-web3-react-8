import React from 'react'
import { Home as Playground } from './pages/Home'

import { Buffer } from 'buffer'
import { GlobalStyle, Layout } from './components/atoms/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useWindowDimensions } from './hooks/internal/useWindowDimensions'
import { MobileNavbar, FullNavbar } from './components/organisms/Navbar'
import { PageInfo } from './constants/types'
import { RiskMarket } from './pages/RiskMarket'
import { RiskPool } from './pages/RiskPool'
import { Dashboard } from './pages/Dashboard'

window.Buffer = window.Buffer || Buffer

const pages: PageInfo[] = [
  {
    name: 'Playground',
    title: 'Playground',
    to: '/',
    element: <Playground />,
  },
  {
    name: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    element: <Dashboard />,
  },
  {
    name: 'Risk Market',
    title: 'Risk Market',
    to: '/market',
    element: <RiskMarket />,
  },
]

function App(): JSX.Element {
  const { isTablet, isMobile } = useWindowDimensions()

  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        {isTablet || isMobile ? <MobileNavbar pages={pages} /> : <FullNavbar pages={pages} />}
        <Layout>
          <Routes>
            <Route path="/" element={<Playground />} />
            <Route path="/market">
              <Route index element={<RiskMarket />} />
              <Route path=":id" element={<RiskPool />} />
            </Route>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route
              path="*"
              element={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 'calc(100vh - 130px)',
                    width: '100%',
                    fontSize: '2rem',
                    fontWeight: 'bold',
                  }}
                >
                  404 Not Found
                </div>
              }
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  )
}

export default App
