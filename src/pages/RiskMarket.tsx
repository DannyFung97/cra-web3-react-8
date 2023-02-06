import React from 'react'
import { PropsWithChildren } from 'react'
import { Content } from '../components/atoms/Container'
import { Flex } from '../components/atoms/Flex'

export function RiskMarket(props: PropsWithChildren): JSX.Element {
  return (
    <Content>
      <Flex></Flex>
      <Flex col>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
        <Flex></Flex>
      </Flex>
    </Content>
  )
}
