import styled from 'styled-components'
import { HeightAndWidthProps, HeightAndWidthCss, GeneralProps, GeneralCss } from '../../general'

export const HeroContainer = styled.div<HeightAndWidthProps & GeneralProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 400px;
  ${HeightAndWidthCss}
  ${GeneralCss}
`

export const Content = styled.div<GeneralProps>`
  padding: 20px 0;
  ${GeneralCss}
`
