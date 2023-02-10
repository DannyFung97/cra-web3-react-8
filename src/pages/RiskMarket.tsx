import { motion } from 'framer-motion'
import React, { PropsWithChildren } from 'react'
import { CardContainer } from '../components/atoms/Card'
import { RiskMarketCard } from '../components/organisms/RiskMarketCard'
import { variants } from '../styles/animation-variants'

export function RiskMarket(props: PropsWithChildren): JSX.Element {
  return (
    <motion.div variants={variants.drop} initial="initial" animate="animate" exit="exit" transition={{ duration: 0.2 }}>
      <CardContainer>
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
        <RiskMarketCard />
      </CardContainer>
    </motion.div>
  )
}
