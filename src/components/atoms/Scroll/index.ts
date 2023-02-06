import { BKPT_MOBILE_END } from '../../../constants'
import styled, { css } from 'styled-components'
import { GeneralProps, GeneralCss } from '../../general'

interface ScrollableProps extends GeneralProps {
  maxDesktopHeight?: string
  maxMobileHeight?: string
}

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

export const Scrollable = styled.div<ScrollableProps>`
  max-height: ${(props) => (props.maxDesktopHeight ? props.maxDesktopHeight : `60vh`)};
  overflow-y: auto;
  padding: 10px;
  background-color: ${(props) => css`
    ${props.theme.backgroundBackdrop};
  `};

  @media screen and (max-width: ${BKPT_MOBILE_END}px) {
    max-height: ${(props) => (props.maxMobileHeight ? props.maxMobileHeight : `75vh`)};
  }
  border-radius: 10px;
  ${GeneralCss}
  ${ThinScrollbarCss}
`
