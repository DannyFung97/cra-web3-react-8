import { motion } from 'framer-motion'
import React, { useMemo } from 'react'
import { Outlet, useMatch, useNavigate, useParams } from 'react-router-dom'
import { useRiskMarket } from '../../context/RiskMarketManager'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import { variants } from '../../styles/animation-variants'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Content } from '../atoms/Container'
import { Flex } from '../atoms/Flex'
import { StyledArrowIosBackOutline } from '../atoms/Icon'
import { Tdiv } from '../atoms/Text'

export const PageHeader = () => {
  const { isBuyer, handleBuyer } = useRiskMarket()
  const isDashboard = useMatch('/dashboard')
  const { id } = useParams()
  const { isMobile } = useWindowDimensions()
  const navigate = useNavigate()

  const title = useMemo(() => {
    if (isDashboard) {
      return 'Dashboard'
    }
    if (id) {
      return 'Pool'
    }
    return 'Risk Market'
  }, [id, isDashboard, isBuyer])

  const toggleNames = useMemo(() => {
    if (isDashboard) {
      return ['My Cover', 'My Yield']
    }
    return ['Buy Cover', 'Earn Yield']
  }, [isDashboard])

  return (
    <Content>
      <Flex itemsCenter around my={48} col={isMobile} gap={20}>
        <motion.div
          variants={variants.slideRight}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2 }}
        >
          <Flex gap={16}>
            {id && (
              <Button
                style={{ minWidth: '0', minHeight: '0' }}
                p={18}
                onClick={() => {
                  navigate('/')
                }}
              >
                <StyledArrowIosBackOutline size={30} />
              </Button>
            )}
            <Tdiv big2 mont bold>
              {title}
            </Tdiv>
          </Flex>
        </motion.div>
        <div style={{ width: '260px' }}>
          <Card
            style={{
              gridTemplateColumns: isBuyer ? '1.2fr 1fr' : '1fr 1.2fr',
              display: 'grid',
              position: 'relative',
              padding: '0',
              gap: '8px',
              borderRadius: '100px',
            }}
          >
            <Card
              style={{ borderRadius: '100px', cursor: 'pointer' }}
              py={16}
              px={20}
              onClick={() => handleBuyer(true)}
              info={isBuyer}
              transparent={!isBuyer}
              justifyCenter
            >
              <Tdiv textAlign="center" t5 bold info={!isBuyer} lightPrimary={isBuyer} nowrap>
                {toggleNames[0]}
              </Tdiv>
            </Card>
            <Card
              style={{ borderRadius: '100px', cursor: 'pointer' }}
              py={16}
              px={20}
              onClick={() => handleBuyer(false)}
              info={!isBuyer}
              transparent={isBuyer}
              justifyCenter
            >
              <Tdiv textAlign="center" t5 bold info={isBuyer} lightPrimary={!isBuyer} nowrap>
                {toggleNames[1]}
              </Tdiv>
            </Card>
          </Card>
        </div>
      </Flex>
      <Outlet />
    </Content>
  )
}
