import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import { ThinScrollbarCss } from '../Scroll'

type AccordionProps = GeneralProps & {
  isOpen: boolean
  noScroll?: boolean
  noBackgroundColor?: boolean
  customHeight?: string
  openSpeed?: number
  closeSpeed?: number
  hideScrollbar?: boolean
  thinScrollbar?: boolean
}

export const Accordion = styled.div<AccordionProps>`
  ${GeneralCss}
  max-height: ${(props) => (props.isOpen ? props.customHeight ?? '70vh' : '0vh')};
  transition: max-height
    ${(props) => {
      if (props.isOpen) {
        return props.openSpeed ? props.openSpeed : 200
      } else {
        return props.closeSpeed ? props.closeSpeed : 200
      }
    }}ms
    ease;
  color: 'auto';
  ${(props) => !props.noBackgroundColor && `background-color: ${props.theme.backgroundBackdrop};`}
  overflow-y: hidden;
  ${(props) => (props.noScroll ? null : `overflow-y: auto;`)}
  ${(props) => (props.thinScrollbar ? ThinScrollbarCss : null)}
  ${(props) =>
    !props.hideScrollbar
      ? ''
      : css`
          ::-webkit-scrollbar {
            width: 0px;
          }
          scrollbar-width: none;
          -ms-overflow-style: none;
        `}
  border-radius: 10px;
`
