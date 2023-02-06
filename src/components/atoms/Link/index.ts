import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { Link } from 'react-router-dom'

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

export const StyledNavLink = styled(Link)<LinkProps>`
  ${LinkCss}
`
