import styled from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'

export const LogoBase = styled.div<GeneralProps>`
  display: flex;
  align-items: flex-start;
  width: 107px;
  text-decoration: none;
  transition: all 200ms ease;
  color: ${({ theme }) => `${theme.textPrimary}`};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  :hover {
  }
  ${GeneralCss}
`
