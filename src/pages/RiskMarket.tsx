import React from 'react'
import { PropsWithChildren } from 'react'
import { Card } from '../components/atoms/Card'
import { Content } from '../components/atoms/Container'
import { Flex } from '../components/atoms/Flex'

export function RiskMarket(props: PropsWithChildren): JSX.Element {
  return (
    <Content>
      <Flex justifyCenter>
        <Flex gap={10} wrapped style={{ maxWidth: '1200px' }}>
          <Card success>1</Card>
          <Card success>2</Card>
          <Card success>3</Card>
          <Card success>4</Card>
          <Card success>5</Card>
          <Card success>1</Card>
          <Card success>2</Card>
          <Card success>3</Card>
          <Card success>4</Card>
          <Card success>5</Card>
        </Flex>
      </Flex>
    </Content>
  )
}
