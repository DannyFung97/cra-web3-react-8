import styled, { css, keyframes } from 'styled-components'
import { ClickProps } from '../Button'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { BKPT_MOBILE_END, BKPT_TABLET_END, Z_MODAL } from '../../../constants'
import { GeneralProps, GeneralCss } from '../../general'

export interface BaseModalProps extends GeneralProps {
  zIndex?: number
  isOpen: boolean
}

export interface ModalProps extends BaseModalProps {
  handleClose: () => void
  modalTitle: string
  centerTitle?: boolean
  disableCloseButton?: boolean
}

export interface ModalButtonProps extends ClickProps {
  lightColor: boolean
  hidden?: boolean
}

export const FadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`

export const DropInAnimation = keyframes`  
  from { transform: translateY(100px); opacity: 0; }
  to { transform: translateY(0px); opacity: 1; }
`

export const ModalContainer = styled.div<BaseModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: ${({ theme }) => theme.backgroundScrim};
  z-index: ${(props) => props.zIndex ?? Z_MODAL};
  ${(props) => (props.isOpen ? 'display: flex;' : 'display: none;')}
  overflow-y: auto;
  animation: ${FadeInAnimation} 300ms ease-in-out normal forwards;
`

export const ModalBase = styled.div<BaseModalProps>`
  margin: auto;
  position: relative;
  border-radius: 10px;
  padding: 24px;
  background-color: ${({ theme }) => theme.backgroundSurface};
  border: none;
  opacity: 0;
  ${(props) =>
    props.isOpen &&
    css`
      animation: ${DropInAnimation} 300ms ease-in-out normal forwards;
    `}

  @media screen and (max-width: ${BKPT_MOBILE_END}px) {
    width: 100%;
  }
`

export const ModalClose = styled.div<ModalButtonProps>`
  visibility: ${(props) => (props.hidden ? 'hidden' : 'visible')};
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.8;
  }
`

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

export const ModalFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
`

export const ModalRow = styled.div<GeneralProps>`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-around;
  ${GeneralCss}

  @media screen and (max-width: ${BKPT_TABLET_END}px) {
    flex-direction: column;
    align-items: center;
  }
`

export const ModalCell = styled.div<GeneralTextProps & GeneralProps>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 24px;
  position: relative;
  ${GeneralTextCss}
  ${GeneralCss}
`
