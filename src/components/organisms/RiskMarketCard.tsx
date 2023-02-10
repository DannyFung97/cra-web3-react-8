import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useRiskMarket } from '../../context/RiskMarketManager'
import { openStyle } from '../../styles/animation-styles'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { Tdiv } from '../atoms/Text'

export const RiskMarketCard = () => {
  const { isBuyer } = useRiskMarket()
  const { id } = useParams()
  const navigate = useNavigate()

  return (
    <Card col>
      <Flex col gap={24}>
        <Flex between widthP={100}>
          <Flex col>
            <Tdiv t6 secondary>
              Pool
            </Tdiv>
            <Tdiv t1 bold nowrap>
              Aave
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              APY
            </Tdiv>
            <Tdiv t1 bold nowrap>
              Aave
            </Tdiv>
          </Flex>
        </Flex>
        <Flex col>
          <Flex between widthP={100} mb={16}>
            <Tdiv t4 secondary>
              Cover Capacity
            </Tdiv>
            <Tdiv t4>33</Tdiv>
          </Flex>
          <Flex between widthP={100} mb={isBuyer ? 0 : 16} style={openStyle(isBuyer)}>
            <Tdiv t4 secondary>
              Cover Demand
            </Tdiv>
            <Tdiv t4>33</Tdiv>
          </Flex>
          <Flex between widthP={100} mb={16}>
            <Tdiv t4 secondary>
              Type
            </Tdiv>
            <Tdiv t4>Lending</Tdiv>
          </Flex>
          <Flex between widthP={100} mb={16}>
            <Tdiv t4 secondary>
              Risk Manager
            </Tdiv>
            <Tdiv t4>Solace</Tdiv>
          </Flex>
        </Flex>
        <Button big onClick={() => navigate('./pool/1')}>
          {!isBuyer ? 'Provide Capital' : 'Buy Cover'}
        </Button>
      </Flex>
    </Card>
  )
}
