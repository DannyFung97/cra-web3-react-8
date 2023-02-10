import { motion, MotionStyle } from 'framer-motion'
import React, { PropsWithChildren, useCallback, useRef, useState } from 'react'
import { HorizontalSeparator } from '../components/atoms/Break'
import { Button } from '../components/atoms/Button'
import { Card, CardContainer } from '../components/atoms/Card'
import { Flex } from '../components/atoms/Flex'
import { StyledCalendar } from '../components/atoms/Icon'
import { TabLabelLink, Tdiv } from '../components/atoms/Text'
import { CalendarModal } from '../components/organisms/CalendarModal'
import { GenericInputSection } from '../components/organisms/Dropdown'
import { useRiskMarket } from '../context/RiskMarketManager'
import { useWindowDimensions } from '../hooks/internal/useWindowDimensions'
import { variants } from '../styles/animation-variants'

const statStyle = {
  justifyContent: 'between',
  display: 'flex',
  flexDirection: 'column',
  width: '150px',
}

const tabs = ['Overview', 'Terms & Conditions']

export function TC(props: PropsWithChildren): JSX.Element {
  return <Tdiv>lorem ipsum</Tdiv>
}

export function RiskPool(props: PropsWithChildren): JSX.Element {
  const { isBuyer } = useRiskMarket()
  const [amount, setAmount] = useState('')
  const [date, setDate] = useState(new Date())
  const [openDates, setOpenDates] = useState(false)
  const { isMobile, isTablet } = useWindowDimensions()

  const [selectedTab, setSelectedTab] = useState('Overview')

  return (
    <>
      <CalendarModal
        modalTitle={'Select Date'}
        handleClose={() => setOpenDates(false)}
        isOpen={openDates}
        selectedDate={date}
        setSelectedDate={setDate}
      />
      <motion.div
        variants={variants.zoom}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.2 }}
      >
        <Flex col={isMobile} gap={24} justifyCenter mb={24}>
          <Card p={36} col gap={16} style={{ width: isMobile ? 'unset' : isTablet ? '400px' : '570px' }}>
            <Flex gap={20}>
              {tabs.map((tab) => (
                <TabLabelLink selected={selectedTab == tab} key={tab}>
                  <a style={{ cursor: 'pointer' }} onClick={() => setSelectedTab(tab)}>
                    {tab}
                  </a>
                </TabLabelLink>
              ))}
            </Flex>
            <HorizontalSeparator />
            {selectedTab == 'Overview' ? (
              <CardContainer>
                <motion.div layout style={statStyle as MotionStyle}>
                  <Tdiv t4 secondary>
                    APY
                  </Tdiv>
                  <Tdiv t1>3-5</Tdiv>
                </motion.div>
                <motion.div layout style={statStyle as MotionStyle}>
                  <Tdiv t4 secondary>
                    Cover Capacity
                  </Tdiv>
                  <Tdiv t1>1 DAI</Tdiv>
                </motion.div>
                {!isBuyer && (
                  <motion.div layout style={statStyle as MotionStyle}>
                    <Tdiv t4 secondary>
                      Cover Demand
                    </Tdiv>
                    <Tdiv t1>1 DAI</Tdiv>
                  </motion.div>
                )}
                <motion.div layout style={statStyle as MotionStyle}>
                  <Tdiv t4 secondary>
                    Risk Manager
                  </Tdiv>
                  <Tdiv t1>Solace</Tdiv>
                </motion.div>
                <motion.div layout style={statStyle as MotionStyle}>
                  <Tdiv t4 secondary>
                    Type
                  </Tdiv>
                  <Tdiv t1>Lending</Tdiv>
                </motion.div>
              </CardContainer>
            ) : (
              <TC />
            )}
          </Card>
          <Card p={36} gap={24} col>
            <Tdiv t2 bold nowrap>
              Commit Capital
            </Tdiv>
            <GenericInputSection
              placeholder="Enter amount to commit"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              backButtonText={'Max'}
              onClickBack={() => 0}
            />

            <Tdiv t2 bold nowrap>
              Choose End Date
            </Tdiv>
            <Button big secondary onClick={() => setOpenDates(true)}>
              <Tdiv info>
                <StyledCalendar size={30} />
              </Tdiv>
              <Tdiv info ml={10}>
                {date.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}
              </Tdiv>
            </Button>
            <Button big info>
              Buy Cover
            </Button>
          </Card>
        </Flex>
      </motion.div>
    </>
  )
}
