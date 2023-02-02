import React, { useCallback, useState } from 'react'
import { Accordion } from '../components/atoms/Accordion'
import { HorizontalSeparator } from '../components/atoms/Break'
import { Button } from '../components/atoms/Button'
import { Card } from '../components/atoms/Card'
import { Content } from '../components/atoms/Container'
import { Flex } from '../components/atoms/Flex'
import { Scrollable } from '../components/atoms/Scrollable'
import { Table, TableBody, TableData, TableFoot, TableHead, TableHeader, TableRow } from '../components/atoms/Table'
import { Tdiv } from '../components/atoms/Text'
import { InputSection } from '../components/molecules/InputSection'
import { BalanceDropdownOptions, DropdownInputSection } from '../components/organisms/Dropdown'
import { ZERO, Z_TABLE } from '../constants'
import { TransactionCondition } from '../constants/enums'
import { ReadToken } from '../constants/types'
import { useCache, useGeneral, useNotifications } from '../context'
import { fixed, formatAmount } from '../utils'

const testTokens: ReadToken[] = [
  {
    address: '0x0000000000000000000000000000000000000000',
    name: 'Test Token 1',
    symbol: 'TT1',
    decimals: 18,
  },
  {
    address: '0x0000000000000000000000000000000000000001',
    name: 'Test Token 2',
    symbol: 'TT2',
    decimals: 10,
  },
  {
    address: '0x0000000000000000000000000000000000000002',
    name: 'Test Stable',
    symbol: 'TS',
    decimals: 6,
    stablecoin: true,
  },
]

export function Home(): JSX.Element {
  const { appTheme, toggleTheme } = useGeneral()
  const { openAccountModal } = useCache()
  const { makeTxToast } = useNotifications()

  const [openAccordion, setOpenAccordion] = useState(false)
  const [d1, setD1] = useState(false)
  const [selectedD1, setSelectedD1] = useState<ReadToken | undefined>(undefined)
  const [d1Input, setD1Input] = useState<string>('')
  const [inputValue, setInputValue] = useState('')

  const successToast = async () => {
    const now = Date.now()
    makeTxToast(
      't',
      TransactionCondition.PENDING,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000',
      undefined
    )
    await new Promise((resolve) => setTimeout(() => resolve(`${now}`), 3000))
    makeTxToast(
      't',
      TransactionCondition.SUCCESS,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000',
      undefined
    )
  }

  const cancelledToast = async () => {
    const now = Date.now()
    makeTxToast('t', TransactionCondition.PENDING, appTheme, `${now}`)
    await new Promise((resolve) => setTimeout(() => resolve(`${now}`), 3000))
    makeTxToast('t', TransactionCondition.CANCELLED, appTheme, `${now}`)
  }

  const failToast = async () => {
    const now = Date.now()
    makeTxToast('t', TransactionCondition.PENDING, appTheme, `${now}`, '0x0000000000000000000000000000000000000000')
    await new Promise((resolve) => setTimeout(() => resolve(`${now}`), 3000))
    makeTxToast(
      't',
      TransactionCondition.FAILURE,
      appTheme,
      `${now}`,
      '0x0000000000000000000000000000000000000000',
      'failed'
    )
  }

  const handleSelectedCoin = useCallback(
    (addr: string) => {
      const coin = testTokens.find((c) => c.address === addr)
      if (coin) {
        if (selectedD1 && coin.decimals < selectedD1.decimals) {
          setD1Input(fixed(formatAmount(d1Input), coin.decimals).toString())
        }
        setSelectedD1(coin)
      }
    },
    [d1Input, selectedD1]
  )

  return (
    <Content>
      <Flex col itemsCenter gap={10}>
        <Flex gap={10}>
          <Button inquiry onClick={openAccountModal}>
            Open Account Modal
          </Button>
          <Button success onClick={successToast}>
            create successful toast
          </Button>
          <Button warning onClick={cancelledToast}>
            create cancelled toast
          </Button>
          <Button error onClick={failToast}>
            create failed toast
          </Button>
          <Button onClick={toggleTheme}>toggle theme</Button>
          <Button onClick={() => setOpenAccordion(!openAccordion)}>Open Accordion</Button>
        </Flex>
        <HorizontalSeparator widthP={100} />
        <Flex gap={10} widthP={100}>
          <Scrollable style={{ padding: '0 10px 0 10px' }} maxDesktopHeight={'30vh'}>
            <Table textAlign="center" style={{ borderSpacing: '0px 7px' }}>
              <TableHead sticky zIndex={Z_TABLE + 1}>
                <TableHeader>A</TableHeader>
                <TableHeader>B</TableHeader>
                <TableHeader>C</TableHeader>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
                <TableRow>
                  <TableData>1</TableData>
                  <TableData>2</TableData>
                  <TableData>3</TableData>
                </TableRow>
              </TableBody>
              <TableFoot sticky zIndex={Z_TABLE + 1}>
                <TableHeader>E</TableHeader>
                <TableHeader>F</TableHeader>
                <TableHeader>G</TableHeader>
              </TableFoot>
            </Table>
          </Scrollable>
          <Accordion isOpen={openAccordion} customHeight={'30vh'}>
            <Flex col p={10} gap={10}>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
              <Card>
                <Tdiv>I am inside the accordion</Tdiv>
              </Card>
            </Flex>
          </Accordion>
          <Flex col gap={4}>
            <InputSection value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
            <InputSection value={inputValue} onChange={(e) => setInputValue(e.target.value)} buttonText={'Max'} />
            <InputSection
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              icon={<>(Icon)</>}
              text={'text'}
            />
            <InputSection
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              buttonText={'Max'}
              icon={<>(Icon)</>}
              text={'text'}
            />
            <InputSection
              displayIconOnMobile={false}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              buttonText={'Max'}
              icon={<>(Icon)</>}
              text={'text'}
              buttonDisabled
            />
            <InputSection
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              buttonText={'Max'}
              icon={<>(Icon)</>}
              text={'text'}
              buttonDisabled
              disabled
            />
          </Flex>
          <Flex col gap={4}>
            <DropdownInputSection
              nohover
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Test</>}
              frontButtonText={'Fixed Coin'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <DropdownInputSection
              displayIconOnMobile={false}
              nohover
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Test</>}
              frontButtonText={'Fixed Coin'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
            />
            <DropdownInputSection
              hasArrow
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Test</>}
              frontButtonText={selectedD1?.symbol ?? 'Select a coin'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClickFront={() => setD1(!d1)}
            />
            <DropdownInputSection
              hasArrow
              isOpen={d1}
              placeholder={'$'}
              frontIcon={<>Test</>}
              frontButtonText={selectedD1?.symbol ?? 'Select a coin'}
              backButtonText={'Max Value'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onClickFront={() => setD1(!d1)}
              onClickBack={() => console.log('max')}
            />
            <BalanceDropdownOptions
              isOpen={d1}
              ignorePrice
              searchedList={testTokens.map((token) => {
                return { ...token, balance: ZERO, price: 0 }
              })}
              onClick={(value: string) => {
                handleSelectedCoin(value)
                setD1(false)
              }}
            />
          </Flex>
        </Flex>
      </Flex>
    </Content>
  )
}
