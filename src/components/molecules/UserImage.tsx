import React, { PropsWithChildren } from 'react'
import { User, WhiteSpaceDiv } from '../atoms/User'
import { GeneralProps } from '../general'

export function UserImage(props: PropsWithChildren<{ style?: React.CSSProperties }> & GeneralProps): JSX.Element {
  return (
    <WhiteSpaceDiv>
      <User {...props}>{props.children}</User>
    </WhiteSpaceDiv>
  )
}
