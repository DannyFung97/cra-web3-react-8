import React, { Fragment, useEffect, useState } from 'react'
import { useWeb3React } from '@web3-react/core'
import { PropsWithChildren } from 'react'
import { MobileNavPanelComponent, TopNav, MobileNavMenu } from '../atoms/Navbar'
import { Button } from '../atoms/Button'
import { Flex } from '../atoms/Flex'
import { StyledMenu, StyledMoon, StyledSun } from '../atoms/Icon'
import makeBlockie from 'ethereum-blockies-base64'
import { useLocation, useNavigate } from 'react-router-dom'
import { useCache, useGeneral, useNetwork } from '../../context'
import { useENS } from '../../hooks/wallet/useENS'
import { RouteInfo } from '../../constants/types'
import { shortenAddress } from '../../utils'
import { TabLabelLink, Tdiv } from '../atoms/Text'
import { UserImage } from '../molecules/UserImage'
import { Logo } from '../molecules/Logo'
import { StyledNavLink } from '../atoms/Link'
import { VerticalSeparator } from '../atoms/Break'
import { useWindowDimensions } from '../../hooks/internal/useWindowDimensions'
import UnconnectedUser from '../../assets/svg/unconnected_user.svg'
import { ModalCloseButton } from '../molecules/Modal'
import { Card } from '../atoms/Card'

export function MobileNavPanel(
  props: PropsWithChildren & { show: boolean; setShow: (show: boolean) => void; routeInfoArr: RouteInfo[] }
): JSX.Element {
  const { appTheme, toggleTheme } = useGeneral()
  const { isMobile } = useWindowDimensions()
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <MobileNavPanelComponent shouldShow={props.show}>
      <MobileNavMenu>
        <Flex between m={20}>
          <ModalCloseButton lightColor={appTheme == 'dark'} onClick={() => props.setShow(false)} />
        </Flex>
        <Flex col gap={10} p={10}>
          {props.routeInfoArr.map((page) => (
            <Card
              justifyCenter
              key={page.to}
              onClick={() => {
                props.setShow(false)
                navigate(page.to)
              }}
            >
              <Tdiv
                info={location.pathname == page.to || page.children?.some((child) => location.pathname.includes(child))}
              >
                {page.name}
              </Tdiv>
            </Card>
          ))}
        </Flex>
        <div style={{ flex: '1 1' }}></div>
        <Flex col mb={isMobile ? 80 : 50}>
          <Flex center gap={20}>
            <Button
              nohover
              onClick={appTheme == 'dark' ? toggleTheme : undefined}
              style={{ minWidth: '0', minHeight: '0' }}
              p={10}
            >
              <StyledSun size={30} />
            </Button>
            <VerticalSeparator />
            <Button
              nohover
              onClick={appTheme == 'light' ? toggleTheme : undefined}
              style={{ minWidth: '0', minHeight: '0' }}
              p={10}
            >
              <StyledMoon size={30} />
            </Button>
          </Flex>
        </Flex>
      </MobileNavMenu>
    </MobileNavPanelComponent>
  )
}

export function MobileNavbar(props: PropsWithChildren & { routeInfoArr: RouteInfo[] }): JSX.Element {
  const { account } = useWeb3React()
  const { openAccountModal } = useCache()
  const [show, setShow] = useState(false)

  return (
    <TopNav>
      <MobileNavPanel show={show} setShow={setShow} routeInfoArr={props.routeInfoArr} />
      <Flex between>
        <Button transparent nohover onClick={() => setShow(!show)}>
          <Tdiv primary>
            <StyledMenu size={40} />
          </Tdiv>
        </Button>
        <Button transparent nohover onClick={openAccountModal}>
          {account ? (
            <UserImage width={35} height={35} style={{ margin: 'auto' }}>
              <img src={makeBlockie(account)} alt={'account'} />
            </UserImage>
          ) : (
            <img src={UnconnectedUser} />
          )}
        </Button>
      </Flex>
    </TopNav>
  )
}

export function FullNavbar(props: PropsWithChildren & { routeInfoArr: RouteInfo[] }): JSX.Element {
  const { appTheme, toggleTheme } = useGeneral()
  const { account } = useWeb3React()
  const name = useENS()
  const { activeNetwork } = useNetwork()
  const [scrollPosition, setScrollPosition] = useState(0)
  const location = useLocation()
  const { openAccountModal } = useCache()

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset
      setScrollPosition(position)
    }
    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <TopNav>
      <Flex stretch between px={20}>
        <Flex gap={20} itemsCenter>
          <Logo location={location} />
          <Flex gap={20}>
            {props.routeInfoArr.map((page) => (
              <Fragment key={page.to}>
                <TabLabelLink
                  t4
                  selected={
                    location.pathname == page.to || page.children?.some((child) => location.pathname.includes(child))
                  }
                >
                  <StyledNavLink to={page.to}>{page.name}</StyledNavLink>
                </TabLabelLink>
              </Fragment>
            ))}
          </Flex>
        </Flex>
        <Flex gap={10} itemsCenter>
          <Button width={40} white onClick={toggleTheme}>
            {appTheme == 'light' ? (
              <Tdiv darkPrimary>
                <StyledSun size={30} />
              </Tdiv>
            ) : (
              <Tdiv darkPrimary>
                <StyledMoon size={30} />
              </Tdiv>
            )}
          </Button>
          <Button nohover p={8} style={{ borderRadius: '28px', minWidth: 'unset' }} onClick={openAccountModal}>
            <Flex between gap={5} itemsCenter>
              {account ? (
                <UserImage width={35} height={35} style={{ margin: 'auto' }}>
                  <img src={makeBlockie(account)} alt={'account'} />
                </UserImage>
              ) : (
                <img src={UnconnectedUser} />
              )}
              {scrollPosition <= 40 &&
                (account ? (
                  <Flex col around>
                    <Tdiv lightPrimary textAlign="left" t4>
                      {name ?? shortenAddress(account)}
                    </Tdiv>
                    <Flex>
                      {activeNetwork.logo && (
                        <img src={activeNetwork.logo} width={20} height={20} style={{ marginRight: '2px' }} />
                      )}
                      <Tdiv lightPrimary nowrap autoAlignVertical>
                        {activeNetwork.name}
                      </Tdiv>
                    </Flex>
                  </Flex>
                ) : (
                  <Flex col around>
                    <Tdiv lightPrimary textAlign="left">
                      Not connected
                    </Tdiv>
                    <Flex>
                      {activeNetwork.logo && (
                        <img src={activeNetwork.logo} width={20} height={20} style={{ marginRight: '2px' }} />
                      )}
                      <Tdiv lightPrimary textAlign="left" t4 nowrap autoAlignVertical>
                        {activeNetwork.name}
                      </Tdiv>
                    </Flex>
                  </Flex>
                ))}
            </Flex>
          </Button>
        </Flex>
      </Flex>
    </TopNav>
  )
}
