import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import { ClickProps } from '../Button'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { Flex, FlexProps } from '../Flex'
import { BKPT_MOBILE_END, BKPT_TABLET_END } from '../../../constants'

interface CardProps extends ClickProps, FlexProps {
  transparent?: boolean
  canHover?: boolean
  success?: boolean
  warning?: boolean
  error?: boolean
  info?: boolean
  inquiry?: boolean
}

interface CardContainerProps extends GeneralProps, FlexProps {
  cardsPerRow?: number
}

const CardCss = css<CardProps>`
  border-radius: 12px;
  padding: 16px;
  background: ${({ theme }) => theme.backgroundInteractive};
  ${(props) => props.success && `background: ${props.theme.accentSuccess};`}
  ${(props) => props.info && `background: ${props.theme.accentAction};`}
  ${(props) => props.warning && `background: ${props.theme.accentWarning};`}
  ${(props) => props.error && `background: ${props.theme.accentCritical};`}
  ${(props) => props.inquiry && `background: ${props.theme.accentInquiry};`}
  ${(props) => props.transparent && `background: rgba(255, 255, 255, 0);`}
  ${GeneralCss}
`

export const CardContainer = styled.div<CardContainerProps & GeneralTextProps>`
  display: grid;
  grid-template-columns: repeat(${(props) => (props.cardsPerRow ? props.cardsPerRow : '3')}, 1fr);
  gap: 24px;

  @media screen and (max-width: ${BKPT_TABLET_END}px) {
    grid-template-columns: repeat(${(props) => (props.cardsPerRow ? props.cardsPerRow - 1 : '2')}, 1fr);
  }

  @media screen and (max-width: ${BKPT_MOBILE_END}px) {
    grid-template-columns: repeat(${(props) => (props.cardsPerRow ? props.cardsPerRow - 2 : '1')}, 1fr);
  }

  ${GeneralTextCss}
  ${GeneralCss}
`

export const Card = styled(Flex)<CardProps>`
  ${CardCss}
  ${GeneralCss}
`
