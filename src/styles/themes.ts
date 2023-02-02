import { opacify } from '../utils'

export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  gray50: '#F5F6FC',
  gray100: '#E8ECFB',
  gray150: '#D2D9EE',
  gray200: '#B8C0DC',
  gray250: '#A6AFCA',
  gray300: '#98A1C0',
  gray350: '#888FAB',
  gray400: '#7780A0',
  gray450: '#6B7594',
  gray500: '#5D6785',
  gray550: '#505A78',
  gray600: '#404A67',
  gray650: '#333D59',
  gray700: '#293249',
  gray750: '#1B2236',
  gray800: '#131A2A',
  gray850: '#0E1524',
  gray900: '#0D111C',
  gray950: '#080B11',
  pink50: '#F9ECF1',
  pink100: '#FFD9E4',
  pink200: '#FBA4C0',
  pink300: '#FF6FA3',
  pink400: '#FB118E',
  pink500: '#C41969',
  pink600: '#8C0F49',
  pink700: '#55072A',
  pink800: '#350318',
  pink900: '#2B000B',
  pinkVibrant: '#F51A70',
  red50: '#FAECEA',
  red100: '#FED5CF',
  red200: '#FEA79B',
  red300: '#FD766B',
  red400: '#FA2B39',
  red500: '#C4292F',
  red600: '#891E20',
  red700: '#530F0F',
  red800: '#380A03',
  red900: '#240800',
  redVibrant: '#F14544',
  yellow50: '#F6F2D5',
  yellow100: '#DBBC19',
  yellow200: '#DBBC19',
  yellow300: '#BB9F13',
  yellow400: '#A08116',
  yellow500: '#866311',
  yellow600: '#5D4204',
  yellow700: '#3E2B04',
  yellow800: '#231902',
  yellow900: '#180F02',
  yellowVibrant: '#FAF40A',
  gold200: '#EEB317',
  goldVibrant: '#FEB239',
  green50: '#E3F3E6',
  green100: '#BFEECA',
  green200: '#76D191',
  green300: '#40B66B',
  green400: '#209853',
  green500: '#0B783E',
  green600: '#0C522A',
  green700: '#053117',
  green800: '#091F10',
  green900: '#09130B',
  greenVibrant: '#5CFE9D',
  blue50: '#EDEFF8',
  blue100: '#DEE1FF',
  blue200: '#ADBCFF',
  blue300: '#869EFF',
  blue400: '#4C82FB',
  blue500: '#1267D6',
  blue600: '#1D4294',
  blue700: '#09265E',
  blue800: '#0B193F',
  blue900: '#040E34',
  blueVibrant: '#587BFF',
  magentaVibrant: '#FC72FF',
  purple100: '#e8bcf0',
  purple200: '#da8ee7',
  purple300: '#ca5cdd',
  purple400: '#be2ed6',
  purple500: '#b100cd',
  purple600: '#a000c8',
  purple700: '#8a00c2',
  purple800: '#7600bc',
  purple900: '#4c00b0',
}

const sharedTheme = {
  white: colors.white,
  black: colors.black,
}

export const lightTheme = {
  ...sharedTheme,
  background: '#faf9fa',
  backgroundSurface: colors.white,
  backgroundBackdrop: colors.gray200,
  backgroundInteractive: colors.gray50,
  backgroundScrim: opacify(60, colors.gray900),
  backgroundOutline: colors.gray150,

  textPrimary: colors.gray900,
  textSecondary: colors.gray400,
  textTertiary: colors.gray300,

  accentAction: colors.blue400,
  accentActive: colors.blue400,
  accentSuccess: colors.green300,
  accentWarning: colors.yellow300,
  accentFailure: colors.red400,
  accentCritical: colors.red400,
  accentInquiry: colors.purple300,

  accentActionSoft: opacify(24, colors.blue400),
  accentActiveSoft: opacify(24, colors.blue400),
  accentSuccessSoft: opacify(24, colors.green300),
  accentWarningSoft: opacify(24, colors.yellow300),
  accentFailureSoft: opacify(12, colors.red400),
  accentInquirySoft: opacify(12, colors.purple300),

  accentActionHighlighted: colors.blue300,
  accentActiveHighlighted: colors.blue300,
  accentSuccessHighlighted: colors.green200,
  accentWarningHighlighted: colors.yellow200,
  accentFailureHighlighted: colors.red300,
  accentInquiryHighlighted: colors.purple200,

  accentTextDarkPrimary: opacify(80, colors.gray900),
  accentTextDarkSecondary: opacify(60, colors.gray900),
  accentTextDarkTertiary: opacify(24, colors.gray900),

  accentTextLightPrimary: colors.gray50,
  accentTextLightSecondary: opacify(72, colors.gray50),
  accentTextLightTertiary: opacify(12, colors.gray50),
}

export const darkTheme = {
  ...sharedTheme,
  background: colors.gray800,
  backgroundSurface: colors.gray700,
  backgroundBackdrop: colors.gray950,
  backgroundInteractive: colors.gray750,
  backgroundScrim: opacify(72, colors.gray900),
  backgroundOutline: colors.gray850,

  textPrimary: colors.white,
  textSecondary: colors.gray300,
  textTertiary: colors.gray500,

  accentAction: colors.blue400,
  accentActive: colors.blue400,
  accentSuccess: colors.green300,
  accentWarning: colors.yellow300,
  accentFailure: colors.red400,
  accentCritical: colors.red400,
  accentInquiry: colors.purple300,

  accentActionSoft: opacify(24, colors.blue400),
  accentActiveSoft: opacify(24, colors.blue400),
  accentSuccessSoft: opacify(24, colors.green300),
  accentWarningSoft: opacify(24, colors.yellow300),
  accentFailureSoft: opacify(12, colors.red400),
  accentInquirySoft: opacify(12, colors.purple300),

  accentActionHighlighted: colors.blue300,
  accentActiveHighlighted: colors.blue300,
  accentSuccessHighlighted: colors.green200,
  accentWarningHighlighted: colors.yellow200,
  accentFailureHighlighted: colors.red300,
  accentInquiryHighlighted: colors.purple200,

  accentTextDarkPrimary: opacify(80, colors.gray900),
  accentTextDarkSecondary: opacify(60, colors.gray900),
  accentTextDarkTertiary: opacify(24, colors.gray900),

  accentTextLightPrimary: colors.gray50,
  accentTextLightSecondary: opacify(72, colors.gray50),
  accentTextLightTertiary: opacify(12, colors.gray50),
}

export type Theme = typeof lightTheme | typeof darkTheme
