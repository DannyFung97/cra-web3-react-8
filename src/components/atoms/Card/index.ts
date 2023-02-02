import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import { ClickProps } from '../Button'
import { BKPT_3, BKPT_4 } from '../../../constants'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { Flex, FlexProps } from '../Flex'

interface CardProps extends ClickProps, FlexProps {
  transparent?: boolean
  canHover?: boolean
  success?: boolean
  warning?: boolean
  error?: boolean
  action?: boolean
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
  ${(props) => props.action && `background: ${props.theme.accentAction};`}
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
  ${GeneralTextCss}
  ${GeneralCss}

  @media screen and (max-width: ${BKPT_4}px) {
    grid-template-columns: repeat(${(props) => (props.cardsPerRow ? props.cardsPerRow - 1 : '2')}, 1fr);
  }

  @media screen and (max-width: ${BKPT_3}px) {
    grid-template-columns: repeat(${(props) => (props.cardsPerRow ? props.cardsPerRow - 2 : '1')}, 1fr);
  }
`

export const Card = styled(Flex)<CardProps>`
  ${CardCss}
  ${GeneralCss}
`
