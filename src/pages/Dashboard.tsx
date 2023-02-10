import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
import { Button } from '../components/atoms/Button'
import { Card } from '../components/atoms/Card'
import { Flex } from '../components/atoms/Flex'
import { Tdiv } from '../components/atoms/Text'
import { GenericInputSection } from '../components/organisms/Dropdown'
import { useRiskMarket } from '../context/RiskMarketManager'
import { useWindowDimensions } from '../hooks/internal/useWindowDimensions'
import { variants } from '../styles/animation-styles'

function BeneficiaryDashboard(props: PropsWithChildren): JSX.Element {
  const [amount, setAmount] = React.useState('0')
  const { isMobile } = useWindowDimensions()

  return (
    <motion.div
      variants={variants.slideA}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <Flex col={isMobile} gap={24} justifyCenter mb={24}>
        <Card p={36}>
          <Flex col>
            <Tdiv t6 secondary>
              My Balance
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
        </Card>
        <Card p={36} gap={49} col={isMobile}>
          <Flex col>
            <Tdiv t6 secondary>
              My Cover Price
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              My Cover Limit
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              Cover End Date
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
        </Card>
      </Flex>
      <Flex col={isMobile} gap={24} justifyCenter>
        <Card p={36}>
          <Flex col gap={24}>
            <Tdiv t6 secondary>
              Add Funds
            </Tdiv>
            <GenericInputSection
              placeholder="Enter amount of DAI to add"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              backButtonText={'Max'}
              onClickBack={() => 0}
            />
            <Button big info>
              Add Funds
            </Button>
          </Flex>
        </Card>
        <Card p={36}>
          <Flex col gap={24}>
            <Tdiv t6 secondary>
              Edit Cover Limit
            </Tdiv>
            <GenericInputSection
              placeholder="Enter new amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <Button big info>
              Update Cover Limit
            </Button>
          </Flex>
        </Card>
      </Flex>
    </motion.div>
  )
}

function UnderwriterDashboard(props: PropsWithChildren): JSX.Element {
  const { isMobile } = useWindowDimensions()

  return (
    <motion.div
      variants={variants.slideB}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.2 }}
    >
      <Flex col={isMobile} gap={24} justifyCenter mb={24}>
        <Card p={36}>
          <Flex col>
            <Tdiv t6 secondary>
              Total Assets Provided
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
        </Card>
        <Card p={36} gap={49} col={isMobile}>
          <Flex col>
            <Tdiv t6 secondary>
              My Total Yield
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
        </Card>
      </Flex>
      <Flex col gap={24} justifyCenter>
        <Card p={36} gap={49} col={isMobile} marginAuto>
          <Flex col>
            <Tdiv t6 secondary>
              Pool Name
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              APY
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              Assets Provided
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Button big>Withdraw</Button>
          </Flex>
        </Card>
        <Card p={36} gap={49} col={isMobile} marginAuto>
          <Flex col>
            <Tdiv t6 secondary>
              Pool Name
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              APY
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Tdiv t6 secondary>
              Assets Provided
            </Tdiv>
            <Tdiv t1 nowrap>
              22
            </Tdiv>
          </Flex>
          <Flex col>
            <Button big>Withdraw</Button>
          </Flex>
        </Card>
      </Flex>
    </motion.div>
  )
}

export function Dashboard(props: PropsWithChildren): JSX.Element {
  const { isBuyer } = useRiskMarket()

  return (
    <motion.div variants={variants.drop} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
      {isBuyer ? <BeneficiaryDashboard /> : <UnderwriterDashboard />}
    </motion.div>
  )
}
