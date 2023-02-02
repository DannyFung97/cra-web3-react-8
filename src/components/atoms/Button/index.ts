import { GeneralProps, GeneralCss } from '../../general'
import styled, { css } from 'styled-components'
import { Text4Css } from '../Text/fonts'

export interface ClickProps {
  onClick?: any
  disabled?: boolean
}

export interface ButtonProps extends ClickProps {
  white?: boolean
  info?: boolean
  success?: boolean
  error?: boolean
  warning?: boolean
  inquiry?: boolean
  hidden?: boolean
  noradius?: boolean
  nohover?: boolean
}

const ButtonColorFunc = (props: ButtonProps, theme: any) => {
  if (props.disabled) {
    let textColor = `${theme.accentTextLightPrimary}`
    let bgColor = `${theme.accentActionSoft}`

    if (props.info) bgColor = `${theme.accentActionSoft}`
    if (props.success) bgColor = `${theme.accentSuccessSoft}`
    if (props.warning) bgColor = `${theme.accentWarningSoft}`
    if (props.error) bgColor = `${theme.accentFailureSoft}`
    if (props.inquiry) bgColor = `${theme.accentInquirySoft}`
    if (props.white) {
      textColor = `${theme.accentTextDarkSecondary}`
      bgColor = `${theme.white}`
    }
    return css`
      color: ${textColor};
      background-color: ${bgColor};
    `
  }

  let textColor: string = theme.accentTextLightPrimary
  let bgColor: string = theme.accentAction
  let hoverBgColor: string = theme.accentActionHighlighted

  if (props.info) bgColor = `${theme.accentAction}`
  if (props.success) bgColor = `${theme.accentSuccess}`
  if (props.warning) bgColor = `${theme.accentWarning}`
  if (props.error) bgColor = `${theme.accentFailure}`
  if (props.inquiry) bgColor = `${theme.accentInquiry}`
  if (props.white) {
    textColor = `${theme.accentTextDarkPrimary}`
    bgColor = `${theme.white}`
  }

  if (!props.nohover) {
    if (props.info) hoverBgColor = `${theme.accentActionHighlighted}`
    if (props.success) hoverBgColor = `${theme.accentSuccessHighlighted}`
    if (props.warning) hoverBgColor = `${theme.accentWarningHighlighted}`
    if (props.error) hoverBgColor = `${theme.accentFailureHighlighted}`
    if (props.white) hoverBgColor = `${theme.white}`
    if (props.inquiry) hoverBgColor = `${theme.accentInquiryHighlighted}`
  }

  return css`
    color: ${textColor};
    background-color: ${bgColor};
    &:hover {
      ${!props.nohover &&
      css`
        background-color: ${hoverBgColor};
      `}
    }
  `
}

export const ButtonAppearanceCss = css<ButtonProps & GeneralProps>`
  outline: none;
  border: none;
  ${(props) => !props.noradius && `border-radius: 10px;`}
  transition: all 0.2s, color 0.2s;
  cursor: pointer;
  visibility: ${(props) => (props.hidden ? 'hidden;' : 'visible;')};

  ${(props) => ButtonColorFunc(props, props.theme)}

  font-family: 'Open Sans', sans-serif;
  ${(props) => props.pt !== undefined && 'padding-top: 4px;'}
  ${(props) => props.pb !== undefined && 'padding-bottom: 4px;'}
  ${(props) => props.pl !== undefined && 'padding-left: 16px;'}
  ${(props) => props.pr !== undefined && 'padding-right: 16px;'}
  ${(props) => props.width == undefined && 'min-width: 90px;'}
  ${(props) => props.height == undefined && 'min-height: 34px;'}
  ${Text4Css}
  ${GeneralCss}
`

export const ButtonBaseCss = css<ButtonProps & GeneralProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  text-align: center;

  ${ButtonAppearanceCss}
`

export const ButtonAppearance = styled.button<ButtonProps & GeneralProps>`
  ${ButtonAppearanceCss}
`

export const Button = styled.button<ButtonProps & GeneralProps>`
  ${ButtonBaseCss}
`

export const NavButton = styled.button`
  ${ButtonBaseCss}
  display: block;
  position: absolute;
  right: 10px;
  top: 8px;
  min-height: 30px;
  min-width: 70px;
`
