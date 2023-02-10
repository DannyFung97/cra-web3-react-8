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
  margin: auto;
  padding: 20px;
  max-width: 1200px;
  ${GeneralCss}
`
