import styled from 'styled-components'
import { GeneralProps, GeneralCss } from '../../general'

export const UserImage = styled.div<GeneralProps>`
  width: 40px;
  height: 40px;
  img {
    border-radius: 50%;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${GeneralCss}
`
