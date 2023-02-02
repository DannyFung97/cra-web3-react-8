import React from 'react'
import styled from 'styled-components'
import { Button } from '../atoms/Button'
import { InputSectionWrapper, StyledGenericIconAndText, StyledInput } from '../atoms/Input'
import { Theme } from '../../styles/themes'
import { Tdiv } from '../atoms/Text'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'

export const GenericIconAndText = ({
  icon,
  text,
  disabled,
  displayIconOnMobile,
  width,
}: {
  icon: JSX.Element
  text?: string
  disabled?: boolean
  displayIconOnMobile?: boolean
  width?: number
}): JSX.Element => {
  const { isMobile } = useWindowDimensions()

  return (
    <>
      {((text && isMobile && displayIconOnMobile) || (text && !isMobile)) && (
        <StyledGenericIconAndText disabled={disabled} width={width}>
          {icon}
          <Tdiv t5 secondary>
            {text}
          </Tdiv>
        </StyledGenericIconAndText>
      )}
    </>
  )
}

export const InputSection = ({
  icon,
  text,
  value,
  onChange,
  buttonDisabled,
  disabled,
  w,
  h,
  style,
  displayIconOnMobile = true,
  buttonText,
  buttonOnClick,
  inputWidth,
  iconAndTextWidth,
  placeholder,
  readonly,
}: {
  icon?: JSX.Element
  text?: string
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  buttonDisabled?: boolean
  disabled?: boolean
  w?: number
  h?: number
  style?: React.CSSProperties
  displayIconOnMobile?: boolean
  buttonText?: string
  buttonOnClick?: () => void
  inputWidth?: number
  iconAndTextWidth?: number
  placeholder?: string
  readonly?: boolean
}): JSX.Element => {
  const { isMobile } = useWindowDimensions()

  const rawStyle = {
    ...style,
    width: w ? w : '100%',
    height: h ? h : '50px',
  }
  return (
    <InputSectionWrapper style={rawStyle} t3>
      {icon && (
        <GenericIconAndText
          icon={icon}
          text={text}
          disabled={disabled}
          displayIconOnMobile={displayIconOnMobile}
          width={iconAndTextWidth}
        />
      )}
      <StyledInput
        type="text"
        placeholder={placeholder ?? '0'}
        value={value ?? ''}
        onChange={onChange}
        style={{
          backgroundColor: 'inherit',
          color: 'inherit',
          borderRadius: 'inherit',
          width: inputWidth ?? '100%',
          outline: 'none',
          border: 'inherit',
          borderTopLeftRadius: isMobile && !displayIconOnMobile ? '10px' : '0px',
          borderBottomLeftRadius: isMobile && !displayIconOnMobile ? '10px' : '0px',
          fontSize: 'inherit',
        }}
        disabled={disabled}
        readOnly={readonly}
      />
      {buttonOnClick && (
        <Button
          m={10}
          onClick={buttonOnClick}
          disabled={buttonDisabled}
          info
          style={
            buttonDisabled
              ? {
                  cursor: 'default',
                }
              : {}
          }
        >
          {buttonText}
        </Button>
      )}
    </InputSectionWrapper>
  )
}

export const SmallerInputSection = styled.input<{ theme: Theme }>`
  border-color: ${({ theme }: { theme: Theme }) => theme.backgroundInteractive} !important;
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
  background-color: ${({ theme }: { theme: Theme }) => theme.background} !important;
  outline: none !important;
  &:focus,
  &:hover {
    border-color: ${({ theme }: { theme: Theme }) => theme.backgroundInteractive} !important;
    filter: brightness(120%);
  }
`
