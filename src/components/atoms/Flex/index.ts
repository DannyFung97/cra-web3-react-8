import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import { ButtonAppearanceCss, ButtonProps } from '../Button'
import { ThinScrollbarCss } from '../Scrollbar/ThinScrollbar'

const isNum = (n: boolean | number): n is number => typeof n === 'number'

export interface FlexProps extends ButtonProps, GeneralProps {
  button?: boolean
  between?: boolean
  around?: boolean
  evenly?: boolean
  justifyStart?: boolean
  justifyCenter?: boolean
  justifyEnd?: boolean
  itemsCenter?: boolean
  itemsEnd?: boolean
  center?: boolean
  col?: boolean
  row?: boolean
  stretch?: boolean
  wrapped?: boolean
  marginAuto?: boolean
  gap?: number
  hidden?: boolean
  baseline?: boolean
  rounded?: boolean | number
  shadow?: boolean
  thinScrollbar?: boolean
  zIndex?: number

  bgAction?: boolean
  bgSuccess?: boolean
  bgWarn?: boolean
  bgError?: boolean
  bgInquiry?: boolean
}

// prettier-ignore
export const Flex = styled.div<FlexProps>`
  display: flex;
  ${({ button })        => button                      ? ButtonAppearanceCss                                 : ""}
  ${({ between })       => between                     ? css`justify-content: space-between;`                : ""}
  ${({ around })        => around                      ? css`justify-content: space-around;`                 : ""}
  ${({ evenly })        => evenly                      ? css`justify-content: space-evenly;`                 : ""}
  ${({ justifyStart })  => justifyStart                ? css`justify-content: flex-start;`                   : ""}
  ${({ justifyCenter }) => justifyCenter               ? css`justify-content: center;`                       : ""}
  ${({ justifyEnd })    => justifyEnd                  ? css`justify-content: flex-end;`                     : ""}
  ${({ itemsCenter })   => itemsCenter                 ? css`align-items: center;`                           : ""}
  ${({ itemsEnd })      => itemsEnd                    ? css`align-items: flex-end;`                         : ""}
  ${({ center })        => center                      ? css`justify-content: center;`                       : ""}
  ${({ col })           => col                         ? css`flex-direction: column;`                        : ""}
  ${({ row })           => row                         ? css`flex-direction: row;`                           : ""}
  ${({ stretch })       => stretch                     ? css`align-items: stretch;`                          : ""}
  ${({ wrapped })          => wrapped                  ? css`flex-wrap: wrap;`                               : ""}
  ${({ marginAuto })    => marginAuto                  ? css`margin: auto;`                                  : ""}
  ${({ gap })           => gap           !== undefined ? css`gap: ${gap}px;`                                 : ""}
  ${({ hidden })        => hidden                      ? css`display: none;`                                              : ""}
  ${({ baseline })      => baseline                    ? css`display: inline-block;`                                      : ""}
  ${({ rounded })       => rounded       !== undefined ? css`border-radius: ${isNum(rounded) ? rounded : 12}px;`          : ""}
  ${({ shadow })        => shadow                      ? css`box-shadow: 0px 0px 30px -10px rgba(138, 138, 138, 0.15);`                : ""}
  ${({ thinScrollbar }) => thinScrollbar               ? ThinScrollbarCss                                                 : ""}
  ${({ zIndex })        => zIndex        !== undefined ? css`z-index: ${zIndex};`                                         : ""}
  
  ${(props)             => props.bgAction                ? css`background-color: ${(props.theme).accentAction};` : ""}
  ${(props)             => props.bgError               ? css`background-color: ${(props.theme).accentCritical};` : ""}
  ${(props)             => props.bgSuccess             ? css`background-color: ${(props.theme).accentSuccess};` : ""}
  ${(props)             => props.bgWarn                ? css`background-color: ${(props.theme).accentWarning};` : ""}
  ${(props)             => props.bgInquiry             ? css`background-color: ${(props.theme).accentInquiry};` : ""}

  ${GeneralCss}
  `
