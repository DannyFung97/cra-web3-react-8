import styled from 'styled-components'
import { GeneralProps, GeneralCss } from '../../general'

export interface LayoutProps extends GeneralProps {
  location?: any
}

const Separator = styled.div<
  GeneralProps & {
    horizontal?: boolean
    theme: any
  }
>`
  ${(props) => (props.horizontal ? 'height' : 'width')}: 1px;
  background-color: ${({ theme }) => theme.textTertiary};
  ${GeneralCss}
`

export const HorizontalSeparator = styled(Separator).attrs({
  horizontal: true,
})``

export const VerticalSeparator = styled(Separator).attrs({
  vertical: true,
})``
