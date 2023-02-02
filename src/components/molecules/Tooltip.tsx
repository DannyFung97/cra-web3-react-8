/* import packages */
import React, { PropsWithChildren } from 'react'
import { Tooltip } from 'react-tooltip'
import styled, { css } from 'styled-components'
import 'react-tooltip/dist/react-tooltip.css'

/* import constants */
import { BKPT_1, BKPT_3, Z_TOOLTIP } from '../../constants'

/* import components */
import { StyledLinkExternal } from '../atoms/Icon'
import { Tdiv } from '../atoms/Text'

/* import hooks */
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'

type StyledTooltipProps = {
  id: string
  tip: string
  link?: string
}

const CustomTooltipCss = css`
  max-width: 350px;
  font-size: 14px !important;
  pointer-events: auto !important;
  cursor: pointer;
  z-index: ${Z_TOOLTIP};
  &:hover {
    visibility: visible !important;
    opacity: 1 !important;
  }
`

const CustomTooltip = styled(Tooltip)`
  background-color: ${({ theme }) => theme.backgroundSurface} !important;
  ${CustomTooltipCss}
`

export function StyledNavTooltip({ id, tip, children }: StyledTooltipProps & PropsWithChildren): JSX.Element {
  const { width } = useWindowDimensions()

  return (
    <>
      {width <= BKPT_3 ? (
        <>
          <div id={id} data-tooltip-content={tip} style={{ padding: '4px 0' }}>
            {children}
          </div>
          <CustomTooltip anchorId={id} delayShow={100} delayHide={100} place="right">
            <Tdiv t4 primary>
              {tip}
            </Tdiv>
          </CustomTooltip>
        </>
      ) : (
        children
      )}
    </>
  )
}

export function StyledTooltip({
  id,
  tip,
  children,
  alwaysShowChildren,
  disabled,
  link,
}: PropsWithChildren & StyledTooltipProps & { alwaysShowChildren?: boolean; disabled?: boolean }): JSX.Element {
  /*************************************************************************************

  hooks

  *************************************************************************************/
  const { width } = useWindowDimensions()

  return (
    <>
      {width > BKPT_1 ? (
        <>
          {disabled ? (
            children
          ) : (
            <>
              <a id={id} data-tooltip-content={tip}>
                {children}
              </a>
              <CustomTooltip anchorId={id}>
                {link ? (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: 'none', color: '#fff' }}
                  >
                    <Tdiv t4 primary>
                      {tip}
                    </Tdiv>
                    <br />
                    <Tdiv inquiry textAlign="center" mt={1} bold>
                      Learn more <StyledLinkExternal size={20} />
                    </Tdiv>
                  </a>
                ) : (
                  <Tdiv t4 primary>
                    {tip}
                  </Tdiv>
                )}
              </CustomTooltip>
            </>
          )}
        </>
      ) : alwaysShowChildren ? (
        children
      ) : null}
    </>
  )
}
