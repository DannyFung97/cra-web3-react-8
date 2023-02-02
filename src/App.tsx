import React from 'react'
import { Home } from './pages/Home'

import { Buffer } from 'buffer'
import { GlobalStyle } from './components/atoms/Layout'

window.Buffer = window.Buffer || Buffer

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <Home />
    </>
  )
}

export default App
