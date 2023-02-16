import styled, { css } from 'styled-components'
import { GeneralCss } from '../../general'
import { ClickProps } from '../Button'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { Flex, FlexProps } from '../Flex'
import { BKPT_MOBILE_END, BKPT_TABLET_END } from '../../../constants'
import { motion } from 'framer-motion'

interface CardProps extends ClickProps, FlexProps {
  transparent?: boolean
  canHover?: boolean
  success?: boolean
  warning?: boolean
  error?: boolean
  info?: boolean
  inquiry?: boolean
}

const CardCss = css<CardProps>`
  border-radius: 36px;
  padding: 24px;
  background: ${({ theme }) => theme.backgroundSurface};
  transition: all 0.2s ease-in-out;
  ${(props) => props.success && `background: ${props.theme.accentSuccess};`}
  ${(props) => props.info && `background: ${props.theme.accentAction};`}
  ${(props) => props.warning && `background: ${props.theme.accentWarning};`}
  ${(props) => props.error && `background: ${props.theme.accentCritical};`}
  ${(props) => props.inquiry && `background: ${props.theme.accentInquiry};`}
  ${(props) => props.transparent && `background: rgba(255, 255, 255, 0);`}
  ${(props) => props.canHover && `&:hover { filter: brightness(1.2); }`}
  ${GeneralCss}
`

export const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;

  @media screen and (max-width: ${BKPT_TABLET_END}px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (max-width: ${BKPT_MOBILE_END}px) {
    grid-template-columns: repeat(1, 1fr);
  }

  ${GeneralTextCss}
  ${GeneralCss}
`

export const Card = styled(Flex)<CardProps>`
  ${CardCss}
  ${GeneralCss}
`
