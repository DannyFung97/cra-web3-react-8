import styled, { css } from 'styled-components'
import { GeneralCss, GeneralProps } from '../../general'
import * as Fonts from './fonts'

export * as Fonts from './fonts'

export interface TextAlignProps {
  textAlign?: 'left' | 'center' | 'right' | 'justify'
}

export interface TextStyleProps extends GeneralProps {
  primary?: boolean
  secondary?: boolean
  tertiary?: boolean

  lightPrimary?: boolean
  lightSecondary?: boolean
  lightTertiary?: boolean

  darkPrimary?: boolean
  darkSecondary?: boolean
  darkTertiary?: boolean

  nowrap?: boolean
  mont?: boolean
  info?: boolean
  success?: boolean
  warning?: boolean
  error?: boolean
  inquiry?: boolean

  autoAlignVertical?: boolean
  autoAlignHorizontal?: boolean
  autoAlign?: boolean
  regular?: boolean
  medium?: boolean
  semibold?: boolean
  /** `font-weight: 600` if open sans, `700` if montserrat */ bold?: boolean
  extrabold?: boolean
  italics?: boolean
  underline?: boolean
  lineThrough?: boolean
}

export interface TextFontProps {
  big1?: boolean
  big2?: boolean
  big3?: boolean
  t1?: boolean
  t2?: boolean
  t3?: boolean
  t4?: boolean
  t5?: boolean
  t6?: boolean
  t7?: boolean
  t8?: boolean
  t9?: boolean
}

export interface GeneralTextProps extends TextFontProps, TextAlignProps, TextStyleProps {}

export const TextFontCss = css<TextFontProps>`
  ${(props) => {
    if (props.t1) return Fonts.Text1Css
    if (props.t2) return Fonts.Text2Css
    if (props.t3) return Fonts.Text3Css
    if (props.t4) return Fonts.Text4Css
    if (props.t5) return Fonts.Text5Css
    if (props.t6) return Fonts.Text6Css
    if (props.t7) return Fonts.Text7Css
    if (props.big1) return Fonts.BigSize1Css
    if (props.big2) return Fonts.BigSize2Css
    if (props.big3) return Fonts.BigSize3Css
  }}
`

export const TextAlignCss = css<TextAlignProps>`
  ${(props) => props.textAlign == 'center' && `text-align: center;`}
  ${(props) => props.textAlign == 'left' && `text-align: left;`}
  ${(props) => props.textAlign == 'right' && `text-align: right;`}
`

const AlignHeightCss = css`
  height: 30px;
  line-height: 30px;
`

const AlignVerticalCss = css`
  margin-top: auto;
  margin-bottom: auto;
`

const AlignHorizontalCss = css`
  margin-left: auto;
  margin-right: auto;
`

const AlignAutoCss = css`
  ${AlignHeightCss}
  ${AlignHorizontalCss}
  ${AlignVerticalCss}
`

export const TextStyleCss = css<TextStyleProps>`
  color: ${(props) => props.theme.textPrimary};
  ${(props) => props.primary && `color: ${props.theme.textPrimary};`}
  ${(props) => props.secondary && `color: ${props.theme.textSecondary};`}
  ${(props) => props.tertiary && `color: ${props.theme.textTertiary};`}

  ${(props) => props.lightPrimary && `color: ${props.theme.accentTextLightPrimary};`}
  ${(props) => props.lightSecondary && `color: ${props.theme.accentTextLightSecondary};`}
  ${(props) => props.lightTertiary && `color: ${props.theme.accentTextLightTertiary};`}

  ${(props) => props.darkPrimary && `color: ${props.theme.accentTextDarkPrimary};`}
  ${(props) => props.darkSecondary && `color: ${props.theme.accentTextDarkSecondary};`}
  ${(props) => props.darkTertiary && `color: ${props.theme.accentTextDarkTertiary};`}

  ${(props) => props.nowrap && `white-space: nowrap;`}
  ${(props) => props.mont && `font-family: 'Montserrat', sans-serif;`}
  ${(props) => props.info && `color: ${props.theme.accentAction};`}
  ${(props) => props.success && `color: ${props.theme.accentSuccess};`}
  ${(props) => props.warning && `color: ${props.theme.accentWarning};`}
  ${(props) => props.error && `color: ${props.theme.accentFailure};`}
  ${(props) => props.inquiry && `color: ${props.theme.accentInquiry};`}

  ${(props) => props.autoAlign && AlignAutoCss}
  ${(props) => props.autoAlignVertical && AlignVerticalCss}
  ${(props) => props.autoAlignHorizontal && AlignHorizontalCss}
  ${(props) => props.medium && 'font-weight: 500;'}
  ${(props) => props.semibold && 'font-weight: 600;'}
  ${(props) => {
    if (props.bold && props.mont)
      return css`
        font-weight: 700;
        letter-spacing: 0.5px;
      `
    if (props.bold)
      return css`
        font-weight: 600;
      `
  }}
  ${(props) => props.regular && 'font-weight: 400;'}
  ${(props) => props.extrabold && 'font-weight: 700;'}
  ${(props) => props.italics && 'font-style: italic;'}
  ${(props) => props.underline && 'text-decoration: underline;'}
  ${(props) => props.lineThrough && 'text-decoration: line-through;'}
  ${GeneralCss}
  transition: all 200ms ease;
`

export const GeneralTextCss = css<GeneralTextProps>`
  ${TextFontCss}
  ${TextAlignCss}
  ${TextStyleCss}
`

export const Tdiv = styled.div<GeneralTextProps & GeneralProps>`
  ${GeneralTextCss}
  ${GeneralCss}
`

export const Tspan = styled.span<GeneralTextProps & GeneralProps>`
  ${GeneralTextCss}
  ${GeneralCss}
`

export const TabLabelLink = styled(Tdiv)<GeneralTextProps & GeneralProps & { selected?: boolean }>`
  a {
    transition: color 300ms;
    overflow: hidden;
    display: block;
    position: relative;
    padding: 0.2em 0;
    color: ${({ selected, theme }) => {
      if (selected) return theme.accentAction
      return theme.textPrimary
    }};
  }
  a::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.1em;
    background-color: ${({ theme }) => theme.accentAction};
    opacity: ${({ selected }) => (selected ? 1 : 0)};
    transition: opacity 300ms, transform 300ms;
    transform: translate3d(-100%, 0, 0);
  }
  a:hover::after {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
  ${GeneralCss}
  ${GeneralTextCss}
`
