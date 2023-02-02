import styled from 'styled-components'
import { Theme } from '../../styles/themes'

export const SmallerInputSection = styled.input<{ theme: Theme }>`
  border-color: ${({ theme }: { theme: Theme }) => theme.backgroundOutline} !important;
  width: 100%;
  height: 36px !important;
  border-radius: 8px !important;
  border-width: 1px !important;
  border-style: solid !important;
  padding: 6px 16px !important;
  font-size: 12px !important;
  font-family: 'Open Sans', sans-serif !important;
  box-sizing: border-box !important;
  color: ${({ theme }: { theme: Theme }) => theme.textPrimary} !important;
  background-color: ${({ theme }: { theme: Theme }) => theme.backgroundInteractive} !important;
  outline: none !important;
  transition: all 0.2s ease-in-out;
  &:focus,
  &:hover {
    border-color: ${({ theme }: { theme: Theme }) => theme.backgroundOutline} !important;
    filter: brightness(120%);
  }
`
