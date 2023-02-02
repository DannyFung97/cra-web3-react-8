/*************************************************************************************

    Table of Contents:

    import react
    import components
    import hooks

    CopyButton
      hooks

  *************************************************************************************/

/* import packages */
import React from 'react'

/* import components */
import { Button, ButtonProps } from '../atoms/Button'
import { StyledCheckmark, StyledCopy } from '../atoms/Icon'
import { GeneralProps } from '../general'

/* import hooks */
import useCopyClipboard from '../../hooks/internal/useCopyToClipboard'

interface CopyProps {
  toCopy: string
  objectName: string
}

export const CopyButton: React.FC<CopyProps & ButtonProps & GeneralProps> = (props) => {
  /*

  hooks

  */
  const [isCopied, setCopied] = useCopyClipboard()

  return (
    <Button onClick={() => setCopied(props.toCopy)} {...props}>
      {isCopied ? (
        <>
          <StyledCheckmark size={20} style={{ margin: 'inherit' }} />
          Copied!
        </>
      ) : (
        <>
          <StyledCopy size={20} />
          Copy {props.objectName}
        </>
      )}
    </Button>
  )
}
