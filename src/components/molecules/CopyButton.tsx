/*************************************************************************************

    Table of Contents:

    import react
    import components
    import hooks

    CopyButton
      hooks

  *************************************************************************************/

/* import packages */
import React, { DOMAttributes } from 'react'

/* import components */
import { Button, ButtonProps } from '../atoms/Button'
import { StyledCheckmark, StyledCopy } from '../atoms/Icon'
import { GeneralProps } from '../general'

/* import hooks */
import useCopyClipboard from '../../hooks/internal/useCopyToClipboard'
import { Tdiv } from '../atoms/Text'

interface CopyProps extends DOMAttributes<HTMLButtonElement> {
  toCopy: string
  objectName?: string
}

export const CopyButton: React.FC<CopyProps & ButtonProps & GeneralProps> = (props) => {
  /*

  hooks

  */
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <Button onClick={() => setCopied(props.toCopy)} {...props}>
      {isCopied ? (
        <Tdiv primary>
          <StyledCheckmark size={20} style={{ margin: 'inherit' }} />
        </Tdiv>
      ) : (
        <Tdiv primary>
          <StyledCopy size={20} />
          {props.objectName && `Copy ${props.objectName}`}
        </Tdiv>
      )}
      {props.children}
    </Button>
  )
}
