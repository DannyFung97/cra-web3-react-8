import styled, { css, keyframes } from 'styled-components'
// import { ClickProps } from '../Button'

export interface BaseModalProps {
  zIndex?: number
  isOpen: boolean
}

export interface ModalProps extends BaseModalProps {
  handleClose: () => void
  modalTitle: string
  centerTitle?: boolean
  disableCloseButton?: boolean
}

export interface ClickProps {
  onClick?: any
  disabled?: boolean
}

export interface ModalButtonProps extends ClickProps {
  hidden?: boolean
}

export const FadeInAnimation = keyframes`  
  from { opacity: 0; }
  to { opacity: 1; }
`

export const ModalContainer = styled.div<BaseModalProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  ${(props) => (props.isOpen ? 'display: flex;' : 'display: none;')}
  overflow-y: auto;
`

export const ModalBase = styled.div<BaseModalProps>`
  margin: auto;
  position: relative;
  border-radius: 10px;
  padding: 24px;
  border: none;
  opacity: 0;
  ${(props) =>
    props.isOpen &&
    css`
      animation: ${FadeInAnimation} 300ms ease-in-out normal forwards;
    `}
`

export const ModalClose = styled.div<ModalButtonProps>`
  visibility: ${(props) => (props.hidden ? 'hidden;' : 'visible;')}
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

export const ModalRow = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-around;
`

export const ModalCell = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  padding: 24px;
  position: relative;
`
