import React from 'react'
import { Home as Playground } from './pages/Home'

import { Buffer } from 'buffer'
import { GlobalStyle, Layout } from './components/atoms/Layout'
import { Routes, Route, useLocation } from 'react-router-dom'
import { Navbar } from './components/organisms/Navbar'
import { RouteInfo } from './constants/types'
import { RiskMarket } from './pages/RiskMarket'
import { RiskPool } from './pages/RiskPool'
import { Dashboard } from './pages/Dashboard'
import { PageHeader } from './components/organisms/PageHeader'
import { AnimatePresence } from 'framer-motion'

window.Buffer = window.Buffer || Buffer

const routeInfoArr: RouteInfo[] = [
  {
    name: 'Playground',
    title: 'Playground',
    to: '/playground',
    element: <Playground />,
  },
  {
    name: 'Risk Market',
    title: 'Risk Market',
    to: '/',
    element: <RiskMarket />,
    children: ['/pool'],
  },
  {
    name: 'Dashboard',
    title: 'Dashboard',
    to: '/dashboard',
    element: <Dashboard />,
  },
]

function App(): JSX.Element {
  const location = useLocation()

  return (
    <>
      <GlobalStyle />
      <Navbar routeInfoArr={routeInfoArr} />
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<PageHeader />}>
              <Route path="/" element={<RiskMarket />} />
              <Route path="/pool/:id" element={<RiskPool />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
            <Route path="/playground" element={<Playground />} />
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
        </AnimatePresence>
      </Layout>
    </>
  )
}

export default App
