import React, { useMemo } from 'react'
import { Accordion } from '../atoms/Accordion'
import { Button, ButtonAppearance } from '../atoms/Button'
import { InputSectionWrapper, StyledGenericIconAndText, StyledInput } from '../atoms/Input'
import { Flex } from '../atoms/Flex'
import { Tdiv } from '../atoms/Text'
import { useGeneral } from '../../context/GeneralManager'
import { TokenInfo } from '../../constants/types'
import { formatUnits } from 'ethers/lib/utils'
import { truncateValue } from '../../utils/formatting'
import { StyledArrowDropDown } from '../atoms/Icon'
import { Card } from '../atoms/Card'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'

export const GenericInputSection = ({
  hasArrow,
  frontIcon,
  frontButtonText,
  backButtonText,
  isOpen,
  value,
  onChange,
  onClickFront,
  onClickBack,
  inputDisabled,
  frontButtonDisabled,
  backButtonDisabled,
  w,
  style,
  inputWidth,
  placeholder,
  nohover,
  displayIconOnMobile = true,
}: {
  value: string | undefined
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  hasArrow?: boolean
  onClickFront?: (e: React.ChangeEvent<HTMLInputElement>) => void
  onClickBack?: (e: React.ChangeEvent<HTMLInputElement>) => void
  frontButtonDisabled?: boolean
  backButtonDisabled?: boolean
  frontIcon?: JSX.Element
  frontButtonText?: string
  backButtonText?: string
  isOpen?: boolean
  inputDisabled?: boolean
  w?: number
  style?: React.CSSProperties
  inputWidth?: number
  placeholder?: string
  nohover?: boolean
  displayIconOnMobile?: boolean
}): JSX.Element => {
  const { appTheme } = useGeneral()
  const { isMobile } = useWindowDimensions()

  const rawStyle = {
    ...style,
    width: w ? w : '100%',
    height: '50px',
    borderRadius: '100px',
  }

  const gradientStyle = useMemo(
    () =>
      appTheme == 'light' ? { techygradient: true, warmgradient: false } : { techygradient: false, warmgradient: true },
    [appTheme]
  )
  return (
    <InputSectionWrapper style={rawStyle}>
      {(((frontIcon || frontButtonText) && isMobile && displayIconOnMobile) ||
        ((frontIcon || frontButtonText) && !isMobile)) &&
        (onClickFront ? (
          <Button
            nohover={nohover}
            inquiry
            widthP={100}
            style={{
              justifyContent: 'center',
              height: '50px',
              borderTopRightRadius: '0px',
              borderBottomRightRadius: '0px',
            }}
            onClick={onClickFront ?? undefined}
            disabled={frontButtonDisabled}
          >
            <Flex center gap={4}>
              {frontIcon && (
                <Tdiv autoAlignVertical lightPrimary>
                  {frontIcon}
                </Tdiv>
              )}
              {frontButtonText && (
                <Tdiv lightPrimary t4 {...gradientStyle}>
                  {frontButtonText}
                </Tdiv>
              )}
              {hasArrow && (
                <StyledArrowDropDown style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} size={18} />
              )}
            </Flex>
          </Button>
        ) : (
          <StyledGenericIconAndText>
            {frontIcon}
            <Tdiv t5 secondary>
              {frontButtonText}
            </Tdiv>
          </StyledGenericIconAndText>
        ))}
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
          borderTopLeftRadius:
            isMobile && !displayIconOnMobile
              ? '100px'
              : frontIcon || frontButtonText || onClickFront
              ? '0px'
              : 'inherit',
          borderBottomLeftRadius:
            isMobile && !displayIconOnMobile
              ? '100px'
              : frontIcon || frontButtonText || onClickFront
              ? '0px'
              : 'inherit',
          borderTopRightRadius: onClickBack ? '0px' : 'inherit',
          borderBottomRightRadius: onClickBack ? '0px' : 'inherit',
          fontSize: 'inherit',
        }}
        disabled={inputDisabled}
      />
      {onClickBack && (
        <Button
          onClick={onClickBack}
          disabled={backButtonDisabled}
          nohover={nohover}
          style={{
            border: 'inherit',
            borderTopLeftRadius: '0px',
            borderBottomLeftRadius: '0px',
          }}
        >
          {backButtonText ?? 'MAX'}
        </Button>
      )}
    </InputSectionWrapper>
  )
}

export const DropdownOptions = ({
  comparingList,
  searchedList,
  isOpen,
  noneText,
  onClick,
  customProcessFunction,
  customHeight,
}: {
  comparingList?: string[]
  searchedList: { label: string; value: string; iconUrl?: string }[]
  isOpen: boolean
  noneText?: string
  onClick: (value: string) => void
  customProcessFunction?: (value: string) => string
  customHeight?: number
}): JSX.Element => {
  const { appTheme } = useGeneral()
  const gradientStyle = useMemo(
    () =>
      appTheme == 'light' ? { techygradient: true, warmgradient: false } : { techygradient: false, warmgradient: true },
    [appTheme]
  )
  return (
    <Accordion
      isOpen={isOpen}
      style={{ marginTop: isOpen ? 12 : 0, position: 'relative' }}
      customHeight={`${customHeight ?? 380}px`}
      noBackgroundColor
      thinScrollbar
    >
      <Flex col gap={8} p={12}>
        {searchedList.map((item, i) => (
          <ButtonAppearance
            key={i}
            pt={10.5}
            pb={10.5}
            pl={12}
            pr={12}
            onClick={() => onClick(item.value)}
            disabled={comparingList ? comparingList.includes(item.label) : false}
            style={{ borderRadius: '8px' }}
          >
            <Flex stretch gap={12}>
              <Flex gap={8} itemsCenter>
                {item.iconUrl ? <img src={item.iconUrl} height={24} /> : <Tdiv {...gradientStyle}>{item.label}</Tdiv>}
              </Flex>
              <Tdiv autoAlignVertical bold>
                {customProcessFunction ? customProcessFunction(item.value) : item.value}
              </Tdiv>
            </Flex>
          </ButtonAppearance>
        ))}
        {searchedList.length === 0 && (
          <Tdiv t3 textAlign="center" bold>
            {noneText ?? 'No results found'}
          </Tdiv>
        )}
      </Flex>
    </Accordion>
  )
}

export const BalanceDropdownOptions = ({
  searchedList,
  isOpen,
  noneText,
  ignorePrice,
  onClick,
  comparingList,
}: {
  searchedList: TokenInfo[]
  isOpen: boolean
  noneText?: string
  ignorePrice?: boolean
  comparingList?: string[]
  onClick?: (value: string) => void
}): JSX.Element => {
  const { appTheme } = useGeneral()
  const gradientStyle = useMemo(
    () =>
      appTheme == 'light' ? { techygradient: true, warmgradient: false } : { techygradient: false, warmgradient: true },
    [appTheme]
  )

  return (
    <Accordion isOpen={isOpen} style={{ marginTop: isOpen ? 12 : 0, position: 'relative' }} customHeight={'380px'}>
      <Flex col gap={8} p={12}>
        {searchedList.map((item, i) => (
          <Card
            key={i}
            py={16}
            onClick={() => (onClick ? onClick(item.address) : undefined)}
            disabled={comparingList ? comparingList.includes(item.address.toLowerCase()) : false}
          >
            <Flex stretch between pl={16} pr={16}>
              <Flex gap={8} itemsCenter>
                <img src={`https://assets.solace.fi/${item.name.toLowerCase()}`} width={16} height={16} />
                <Tdiv {...gradientStyle}>{item.symbol}</Tdiv>
              </Flex>
              <Tdiv autoAlignVertical>
                {item.price > 0 && !ignorePrice
                  ? `~$${truncateValue(parseFloat(formatUnits(item.balance, item.decimals)) * item.price, 2)}`
                  : `${truncateValue(formatUnits(item.balance, item.decimals), 2)}`}
              </Tdiv>
            </Flex>
          </Card>
        ))}
        {searchedList.length === 0 && (
          <Tdiv t3 textAlign="center" bold>
            {noneText ?? 'No results found'}
          </Tdiv>
        )}
      </Flex>
    </Accordion>
  )
}
