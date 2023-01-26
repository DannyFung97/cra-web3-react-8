import styled from 'styled-components'

interface ScrollableProps {
  maxDesktopHeight?: string
  maxMobileHeight?: string
  raised?: boolean
}

export const Scrollable = styled.div<ScrollableProps>`
  max-height: ${(props) => (props.maxDesktopHeight ? props.maxDesktopHeight : `60vh`)};
  overflow-y: auto;
  padding: 10px;
  border-radius: 10px;
`
