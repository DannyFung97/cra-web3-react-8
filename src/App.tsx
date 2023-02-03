import React from 'react'
import { Home } from './pages/Home'

import { Buffer } from 'buffer'
import { GlobalStyle } from './components/atoms/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

window.Buffer = window.Buffer || Buffer

function App(): JSX.Element {
  return (
    <>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
