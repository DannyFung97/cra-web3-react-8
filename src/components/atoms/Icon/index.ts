import styled, { css } from 'styled-components'
import { ArrowDropDown } from '@styled-icons/material-rounded/ArrowDropDown'
import { Checkmark } from '@styled-icons/evaicons-solid/Checkmark'
import { Copy } from '@styled-icons/boxicons-regular/Copy'
import { DarkMode } from '@styled-icons/material-outlined/DarkMode'
import { DarkTheme } from '@styled-icons/fluentui-system-regular/DarkTheme'
import { Discord } from '@styled-icons/simple-icons/Discord'
import { DocumentText } from '@styled-icons/typicons/DocumentText'
import { Documents } from '@styled-icons/ionicons-sharp/Documents'
import { DotsHorizontalRounded } from '@styled-icons/boxicons-regular/DotsHorizontalRounded'
import { Github } from '@styled-icons/boxicons-logos/Github'
import { History } from '@styled-icons/boxicons-regular/History'
import { Info } from '@styled-icons/fluentui-system-regular/Info'
import { LinkExternal } from '@styled-icons/boxicons-regular/LinkExternal'
import { Medium } from '@styled-icons/boxicons-logos/Medium'
import { Menu } from '@styled-icons/boxicons-regular/Menu'
import { NetworkChart } from '@styled-icons/boxicons-regular/NetworkChart'
import { PeopleCommunity } from '@styled-icons/fluentui-system-filled/PeopleCommunity'
import { Sun } from '@styled-icons/evaicons-solid/Sun'
import { Twitter } from '@styled-icons/boxicons-logos/Twitter'
import { Wallet } from '@styled-icons/boxicons-solid/Wallet'
import { Warning } from '@styled-icons/fluentui-system-regular/Warning'

export const StyledIconCss = css`
  margin: auto;
  display: block;
`

export const StyledHistory = styled(History)`
  display: block;
`

export const StyledWallet = styled(Wallet)`
  display: block;
`

export const StyledNetworkChart = styled(NetworkChart)`
  display: block;
`

export const StyledDots = styled(DotsHorizontalRounded)`
  margin: auto 0;
  display: block;
`

export const StyledInfo = styled(Info)``

export const StyledCommunity = styled(PeopleCommunity)``

export const StyledDiscord = styled(Discord)``

export const StyledTwitter = styled(Twitter)``

export const StyledGithub = styled(Github)``

export const StyledMedium = styled(Medium)``

export const StyledDocuments = styled(Documents)``

export const StyledDocumentText = styled(DocumentText)``

export const StyledSun = styled(Sun)``

export const StyledMoon = styled(DarkMode)``

export const StyledTheme = styled(DarkTheme)``

export const StyledArrowDropDown = styled(ArrowDropDown)``

export const StyledLinkExternal = styled(LinkExternal)``

export const StyledMenu = styled(Menu)`
  ${StyledIconCss}
`

export const StyledCheckmark = styled(Checkmark)`
  ${StyledIconCss}
`

export const StyledWarning = styled(Warning)`
  ${StyledIconCss}
`

export const StyledCopy = styled(Copy)``
