import { BKPT_3 } from '../../../constants'
import styled, { css } from 'styled-components'
import { GeneralProps, GeneralCss } from '../../general'
import { ThinScrollbarCss } from '../Scrollbar/ThinScrollbar'

interface ScrollableProps extends GeneralProps {
  maxDesktopHeight?: string
  maxMobileHeight?: string
}

export const Scrollable = styled.div<ScrollableProps>`
  max-height: ${(props) => (props.maxDesktopHeight ? props.maxDesktopHeight : `60vh`)};
  overflow-y: auto;
  padding: 10px;
  background-color: ${(props) => css`
    ${props.theme.backgroundBackdrop};
  `};

  @media screen and (max-width: ${BKPT_3}px) {
    max-height: ${(props) => (props.maxMobileHeight ? props.maxMobileHeight : `75vh`)};
  }
  border-radius: 10px;
  ${GeneralCss}
  ${ThinScrollbarCss}
`
