import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import { GeneralTextProps, GeneralTextCss } from '../Text'

interface LinkProps extends GeneralProps, GeneralTextProps {}

const LinkCss = css<LinkProps>`
  text-decoration: none;
  transition: opacity 0.2s;
  &:hover,
  &.is-active {
    opacity: 1;
  }
  ${GeneralCss}
  ${GeneralTextCss}
`

export const HyperLink = styled.a<LinkProps>`
  ${LinkCss}
`
