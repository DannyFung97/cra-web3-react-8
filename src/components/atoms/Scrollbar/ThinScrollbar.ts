import { css } from 'styled-components'

export const ThinScrollbarCss = css`
  ::-webkit-scrollbar {
    width: 0.5em;
  }
  ::-webkit-scrollbar-track {
    background-color: ${({ theme }) => theme.backgroundBackdrop};
  }
  ::-webkit-scrollbar-thumb {
    height: 2em;
    background-image: ${({ theme }) => theme.accentAction};
  }
`
