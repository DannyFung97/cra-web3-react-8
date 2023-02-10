import styled, { css } from 'styled-components'
import { GeneralTextProps, GeneralTextCss } from '../Text'
import { Slider } from '@rebass/forms'
import { BKPT_TABLET_END } from '../../../constants'
import { Text4Css } from '../Text/fonts'
import { Theme } from '../../../styles/themes'

export const StyledInput = styled.input`
  padding: 10px 20px;
  transition: all 0.2s ease-in-out;

  &:focus,
  &:hover {
    border-color: ${({ theme }: { theme: Theme }) => theme.backgroundInteractive} !important;
    filter: brightness(120%);
  }
`

export const StyledGenericIconAndText = styled.div<{ disabled?: boolean; width?: number }>`
  padding: 10px;
  display: flex;
  align-items: center;
  border-right: 1px solid ${({ theme }) => theme.backgroundOutline};
  border-top-left-radius: 100px;
  border-bottom-left-radius: 100px;
  gap: 4px;
  ${({ width }) => width && `width: ${width}px`};
`

export const InputSectionWrapper = styled.div<GeneralTextProps>`
  display: flex;
  border-radius: 100px;
  background-color: ${({ theme }) => theme.backgroundInteractive};
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
  outline: none;
  justify-content: space-between;
  width: 287px;
  /* for screens bigger than BKPT_TABLET_END */
  @media (min-width: ${BKPT_TABLET_END}px) {
    width: 521px;
  }
  ${Text4Css}
  ${GeneralTextCss}
`

const InputCss = css`
  ::placeholder {
    color: ${({ theme }) => theme.textTertiary};
    opacity: 0.5;
  }
  background-color: ${({ theme }) => theme.backgroundBackdrop};
  border: 1px solid ${({ theme }) => theme.backgroundOutline};
  outline: none;
`

export const Search = styled.input`
  ${InputCss}
  ::-webkit-search-cancel-button {
    -webkit-appearance: none;
    height: 1em;
    width: 1em;
    border-radius: 50em;
    background: url(https://pro.fontawesome.com/releases/v5.10.0/svgs/solid/times-circle.svg) no-repeat 50% 50%;
    background-size: contain;
    opacity: 0;
    pointer-events: none;
    filter: invert(1);
  }
  :focus::-webkit-search-cancel-button {
    opacity: 1;
    pointer-events: all;
    cursor: pointer;
  }
  border-radius: 30px;
  border-color: ${({ theme }) => theme.backgroundOutline};
  padding: 10px 20px;
  font-family: 'Open Sans', sans-serif;
`

export const StyledSlider = styled(Slider)<{ disabled?: boolean; theme?: any; custom1?: boolean }>`
  background-color: ${({ theme }) => theme.input.slider_color} !important;
  color: ${({ theme }) => theme.input.slider_node_color} !important;
  ${({ disabled }) =>
    disabled &&
    css`
      opacity: 0.5;
      cursor: default;
      &:hover {
        cursor: default;
      }
    `}
  ${({ custom1 }) => {
    // 8px with cross-browser support for firefox and chromium
    return (
      custom1 &&
      css`
        margin-top: 20px;
        -webkit-appeareance: none;
        height: 20px;
        background-color: red;
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.backgroundInteractive} !important;
          cursor: pointer;
          border: 1px solid ${({ theme }) => theme.accentAction} !important;
        }
        &::-moz-range-thumb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.backgroundInteractive} !important;
          cursor: pointer;
          border: 1px solid ${({ theme }) => theme.accentAction} !important;
        }
        &::-ms-thumb {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: ${({ theme }) => theme.backgroundInteractive} !important;
          cursor: pointer;
          border: 1px solid ${({ theme }) => theme.accentAction} !important;
        }
        &::-moz-focus-outer {
          border: 0;
        }
      `
    )
  }}
`

export const Checkbox = styled.input`
  appearance: none;
  border: 1px solid ${({ theme }) => theme.accentAction};
  border-radius: 5px;
  width: 20px;
  height: 20px;
  padding: 0;
  margin: 0;
  background-color: transparent;
  position: relative;
  cursor: pointer;
  &:hover {
    border-color: ${({ theme }) => theme.accentActionSoft};
  }
  &:checked {
    border-color: ${({ theme }) => theme.accentAction};
  }
  &:checked::after {
    background-color: ${({ theme }) => theme.accentAction};
    margin: 1px;
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 16px;
    height: 16px;
    border-radius: 3px;
    text-align: center;
    /* line-height: 20px; */
    font-size: 6px;
    color: blue;
    /* animate with ease-in-out duration 200ms */
  }
`
