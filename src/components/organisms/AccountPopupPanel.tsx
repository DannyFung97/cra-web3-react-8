import { useWeb3React } from '@web3-react/core'
import makeBlockie from 'ethereum-blockies-base64'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { useCache, useGeneral, useWallet } from '../../context'
import { useENS } from '../../hooks/wallet/useENS'
import { variants } from '../../styles/animation-styles'
import { shortenAddress } from '../../utils'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { StyledArrowIosBackOutline, StyledLinkExternal, StyledMoon, StyledSun } from '../atoms/Icon'
import { Scrollable } from '../atoms/Scroll'
import { Tdiv, Tspan } from '../atoms/Text'
import { CopyButton } from '../molecules/CopyButton'
import { UserImage } from '../molecules/UserImage'
import { WalletList } from '../molecules/WalletList'
import { RecentActivityTable } from './RecentActivityTable'

export function AccountPopupPanel(): JSX.Element {
  const { selectedProvider, appTheme, toggleTheme } = useGeneral()

  const name = useENS()
  const { account } = useWeb3React()
  const { showAccount } = useCache()
  const { disconnect } = useWallet()

  const [showCopyTip, setShowCopyTip] = useState(false)
  const [showExploreTip, setShowExploreTip] = useState(false)
  const [showThemeTip, setShowThemeTip] = useState(false)

  const [panelState, setPanelState] = useState<'start' | 'wallet' | 'tx'>('start')

  return (
    <>
      {showAccount && (
        <div style={{ position: 'fixed', top: '72px', right: '20px', zIndex: '1000' }}>
          <motion.div variants={variants.drop} initial="initial" animate="animate" exit="exit">
            <Card interactiveBg col outlined>
              {account && selectedProvider && (
                <Flex itemsCenter gap={5} mb={20} justifyCenter>
                  <UserImage width={25} height={25}>
                    <img src={makeBlockie(account)} alt={'account'} />
                  </UserImage>
                  <Tdiv t4 semibold>
                    {name ?? shortenAddress(account)}
                  </Tdiv>
                  <Flex gap={5}>
                    <CopyButton
                      transparent
                      onMouseEnter={() => setShowCopyTip(true)}
                      onMouseLeave={() => setShowCopyTip(false)}
                      toCopy={account}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      {showCopyTip && (
                        <Tspan primary t6 style={{ position: 'absolute', top: '30px' }}>
                          Copy
                        </Tspan>
                      )}
                    </CopyButton>
                    <Button
                      transparent
                      onMouseEnter={() => setShowExploreTip(true)}
                      onMouseLeave={() => setShowExploreTip(false)}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      <Tdiv primary>
                        <StyledLinkExternal size={20} />
                      </Tdiv>
                      {showExploreTip && (
                        <Tspan t6 style={{ position: 'absolute', top: '30px' }}>
                          Explorer
                        </Tspan>
                      )}
                    </Button>
                  </Flex>
                </Flex>
              )}
              {panelState == 'start' && (
                <motion.div variants={variants.slideA} initial="initial" animate="animate" exit="exit">
                  <Flex col gap={10}>
                    {account && (
                      <Button inquiry onClick={() => setPanelState('tx')}>
                        Recent Activity
                      </Button>
                    )}
                    <Button transparent outlined onClick={() => setPanelState('wallet')}>
                      <Tdiv primary>{account ? 'Change Wallet' : 'Connect Wallet'}</Tdiv>
                    </Button>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'wallet' && (
                <motion.div variants={variants.slideB} initial="initial" animate="animate" exit="exit">
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Flex gap={10}>
                      <Button width={35} onClick={() => setPanelState('start')}>
                        <StyledArrowIosBackOutline size={20} />
                      </Button>
                      <Button transparent outlined onClick={disconnect}>
                        <Tdiv regular primary>
                          Disconnect
                        </Tdiv>
                      </Button>
                    </Flex>
                    <Scrollable maxMobileHeight={'40vh'}>
                      <WalletList />
                    </Scrollable>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'tx' && (
                <motion.div variants={variants.slideB} initial="initial" animate="animate" exit="exit">
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Button width={35} onClick={() => setPanelState('start')}>
                      <StyledArrowIosBackOutline size={20} />
                    </Button>
                    <RecentActivityTable />
                  </Flex>
                </motion.div>
              )}
              <Flex justifyCenter mt={20}>
                <Button
                  outlined={appTheme == 'light'}
                  onClick={toggleTheme}
                  white
                  onMouseEnter={() => setShowThemeTip(true)}
                  onMouseLeave={() => setShowThemeTip(false)}
                  width={30}
                  radius={50}
                  height={30}
                  style={{ position: 'relative' }}
                >
                  {appTheme == 'light' ? <StyledSun /> : <StyledMoon />}
                  {showThemeTip && (
                    <Tspan t6 style={{ position: 'absolute', top: '30px' }}>
                      Theme
                    </Tspan>
                  )}
                </Button>
              </Flex>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  )
}

export function AccountPopupPanelMobile(): JSX.Element {
  const { selectedProvider, appTheme, toggleTheme } = useGeneral()

  const name = useENS()
  const { account } = useWeb3React()
  const { showAccount } = useCache()
  const { disconnect } = useWallet()

  const [showCopyTip, setShowCopyTip] = useState(false)
  const [showExploreTip, setShowExploreTip] = useState(false)
  const [showThemeTip, setShowThemeTip] = useState(false)

  const [panelState, setPanelState] = useState<'start' | 'wallet' | 'tx'>('start')

  return (
    <>
      {showAccount && (
        <div style={{ position: 'fixed', top: '65px', zIndex: '1000', width: '100%' }}>
          <motion.div variants={variants.drop} initial="initial" animate="animate" exit="exit">
            <Card col interactiveBg outlined style={{ borderRadius: '0' }}>
              {account && selectedProvider && (
                <Flex itemsCenter gap={5} mb={20} justifyCenter>
                  <UserImage width={25} height={25}>
                    <img src={makeBlockie(account)} alt={'account'} />
                  </UserImage>
                  <Tdiv t4 semibold>
                    {name ?? shortenAddress(account)}
                  </Tdiv>
                  <Flex gap={5}>
                    <CopyButton
                      transparent
                      onMouseEnter={() => setShowCopyTip(true)}
                      onMouseLeave={() => setShowCopyTip(false)}
                      toCopy={account}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    ></CopyButton>
                    <Button
                      transparent
                      onMouseEnter={() => setShowExploreTip(true)}
                      onMouseLeave={() => setShowExploreTip(false)}
                      width={30}
                      radius={50}
                      height={30}
                      style={{ position: 'relative' }}
                    >
                      <Tdiv primary>
                        <StyledLinkExternal size={20} />
                      </Tdiv>
                    </Button>
                  </Flex>
                </Flex>
              )}
              {panelState == 'start' && (
                <motion.div variants={variants.slideA} initial="initial" animate="animate" exit="exit">
                  <Flex col gap={10}>
                    {account && (
                      <Button inquiry onClick={() => setPanelState('tx')}>
                        Recent Activity
                      </Button>
                    )}
                    <Button transparent outlined onClick={() => setPanelState('wallet')}>
                      <Tdiv primary>{account ? 'Change Wallet' : 'Connect Wallet'}</Tdiv>
                    </Button>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'wallet' && (
                <motion.div variants={variants.slideB} initial="initial" animate="animate" exit="exit">
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Flex gap={10}>
                      <Button width={35} onClick={() => setPanelState('start')}>
                        <StyledArrowIosBackOutline size={20} />
                      </Button>
                      <Button transparent outlined onClick={disconnect}>
                        <Tdiv regular primary>
                          Disconnect
                        </Tdiv>
                      </Button>
                    </Flex>
                    <Scrollable maxMobileHeight={'40vh'}>
                      <WalletList />
                    </Scrollable>
                  </Flex>
                </motion.div>
              )}
              {panelState == 'tx' && (
                <motion.div variants={variants.slideB} initial="initial" animate="animate" exit="exit">
                  <Flex col itemsCenter gap={10} widthP={100}>
                    <Button width={35} onClick={() => setPanelState('start')}>
                      <StyledArrowIosBackOutline size={20} />
                    </Button>
                    <RecentActivityTable />
                  </Flex>
                </motion.div>
              )}
              <Flex justifyCenter mt={20}>
                <Button
                  outlined={appTheme == 'light'}
                  onClick={toggleTheme}
                  white
                  onMouseEnter={() => setShowThemeTip(true)}
                  onMouseLeave={() => setShowThemeTip(false)}
                  radius={50}
                  height={30}
                  style={{ position: 'relative' }}
                >
                  {appTheme == 'light' ? <StyledSun size={30} /> : <StyledMoon size={30} />}
                </Button>
              </Flex>
            </Card>
          </motion.div>
        </div>
      )}
    </>
  )
}
