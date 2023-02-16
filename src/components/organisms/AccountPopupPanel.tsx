import { useWeb3React } from '@web3-react/core'
import makeBlockie from 'ethereum-blockies-base64'
import { motion } from 'framer-motion'
import React, { useState } from 'react'
import { Network } from '../../constants/types'
import { useCache, useGeneral, useNetwork, useProvider, useWallet } from '../../context'
import { useENS } from '../../hooks/wallet/useENS'
import { variants } from '../../styles/animation-styles'
import { shortenAddress } from '../../utils'
import { Button } from '../atoms/Button'
import { Card } from '../atoms/Card'
import { Flex } from '../atoms/Flex'
import { StyledArrowIosBackOutline, StyledLinkExternal, StyledMoon, StyledSun } from '../atoms/Icon'
import { Scrollable } from '../atoms/Scroll'
import { Tdiv, Tspan } from '../atoms/Text'
import ToggleSwitch from '../atoms/ToggleSwitch/ToggleSwitch'
import { CopyButton } from '../molecules/CopyButton'
import { UserImage } from '../molecules/UserImage'
import { WalletList } from '../molecules/WalletList'

export function AccountPopupPanel(): JSX.Element {
  const { selectedProvider, appTheme, toggleTheme } = useGeneral()

  const name = useENS()
  const { account } = useWeb3React()
  const { showAccount } = useCache()
  const { disconnect } = useWallet()
  const { adjustedNetworks, showTestnets, handleShowTestnets } = useProvider()
  const { activeNetwork, changeNetwork } = useNetwork()

  const [showCopyTip, setShowCopyTip] = useState(false)
  const [showExploreTip, setShowExploreTip] = useState(false)
  const [showThemeTip, setShowThemeTip] = useState(false)

  const [panelState, setPanelState] = useState<'start' | 'network' | 'wallet'>('start')

  return (
    <>
      {showAccount && (
        <div style={{ position: 'fixed', top: '72px', right: '20px', zIndex: '1000' }}>
          <Card col>
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
                  >
                    {showCopyTip && (
                      <Tspan primary t6 style={{ position: 'absolute', top: '55px' }}>
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
                  >
                    <Tdiv primary>
                      <StyledLinkExternal size={20} />
                    </Tdiv>
                    {showExploreTip && (
                      <Tspan t6 style={{ position: 'absolute', top: '55px' }}>
                        Explorer
                      </Tspan>
                    )}
                  </Button>
                  <Button
                    onClick={toggleTheme}
                    white
                    onMouseEnter={() => setShowThemeTip(true)}
                    onMouseLeave={() => setShowThemeTip(false)}
                    width={30}
                    radius={50}
                    height={30}
                  >
                    {appTheme == 'light' ? <StyledSun /> : <StyledMoon />}
                    {showThemeTip && (
                      <Tspan t6 style={{ position: 'absolute', top: '55px' }}>
                        Theme
                      </Tspan>
                    )}
                  </Button>
                </Flex>
              </Flex>
            )}
            {panelState == 'start' && (
              <motion.div variants={variants.slideA} initial="initial" animate="animate" exit="exit">
                <Flex col gap={10}>
                  <Button inquiry onClick={() => setPanelState('wallet')}>
                    Change Wallet
                  </Button>
                  <Button inquiry onClick={() => setPanelState('network')}>
                    Change Network
                  </Button>
                </Flex>
              </motion.div>
            )}
            {panelState != 'start' && (
              <motion.div variants={variants.slideB} initial="initial" animate="animate" exit="exit">
                <Flex col itemsCenter gap={5}>
                  <Flex gap={10}>
                    <Button width={35} onClick={() => setPanelState('start')}>
                      <StyledArrowIosBackOutline size={20} />
                    </Button>
                    {panelState == 'wallet' && account && <Button onClick={disconnect}>Disconnect</Button>}
                    {panelState == 'network' && (
                      <Flex justifyCenter itemsCenter>
                        <Tdiv t4 primary>
                          Show Testnets
                        </Tdiv>
                        <ToggleSwitch
                          id="show-testnets"
                          toggled={showTestnets}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleShowTestnets(e.target.checked)}
                        />
                      </Flex>
                    )}
                  </Flex>
                  <Scrollable maxMobileHeight={'40vh'}>
                    {panelState == 'wallet' ? (
                      <WalletList />
                    ) : (
                      <Flex col style={{ margin: 'auto' }} gap={10}>
                        {adjustedNetworks.map((network: Network) => (
                          <Card
                            px={20}
                            py={10}
                            canHover
                            key={network.name}
                            onClick={() => changeNetwork(network.chainId)}
                            justifyCenter
                            info={network.chainId === activeNetwork.chainId}
                          >
                            <Tdiv t4 bold lightPrimary={network.chainId === activeNetwork.chainId}>
                              {network.name}
                            </Tdiv>
                          </Card>
                        ))}
                      </Flex>
                    )}
                  </Scrollable>
                </Flex>
              </motion.div>
            )}
          </Card>
        </div>
      )}
    </>
  )
}
