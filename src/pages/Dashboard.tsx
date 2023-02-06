import React, { PropsWithChildren } from 'react'
import { HorizontalSeparator } from '../components/atoms/Break'
import { Card } from '../components/atoms/Card'
import { Content } from '../components/atoms/Container'
import { Flex } from '../components/atoms/Flex'

export function Dashboard(props: PropsWithChildren): JSX.Element {
  return (
    <Content>
      <HorizontalSeparator />
    </Content>
  )
}
