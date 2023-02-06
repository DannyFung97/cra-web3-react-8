import React, { PropsWithChildren } from 'react'
import { Card } from '../components/atoms/Card'
import { Content } from '../components/atoms/Container'
import { Flex } from '../components/atoms/Flex'

export function RiskPool(props: PropsWithChildren): JSX.Element {
  return (
    <Content>
      <Flex></Flex>
      <Card></Card>
    </Content>
  )
}
