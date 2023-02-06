import styled, { createGlobalStyle } from 'styled-components'
import { Text3Css } from '../Text/fonts'

export const GlobalStyle = createGlobalStyle`
body{
  margin: 0;
  font-family: 'Open Sans', sans-serif;
  line-height: 1.4;
  background: ${({ theme }) => theme.background};
  background-attachment: fixed;
  background-size: cover;
  ${Text3Css}
}
`

export const Layout = styled.div`
  padding: 60px 0 60px 0;
`
