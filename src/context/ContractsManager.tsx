import React, { createContext, PropsWithChildren, useContext, useMemo } from 'react'
import { Contract } from '@ethersproject/contracts'

import { useContractArray, useGetContract } from '../hooks/contract/useContract'
import { ContractSources } from '../constants/types'
import { useNetwork } from './NetworkManager'

/*

This manager supplies the Contracts data all across the application, it is here where
the web application mainly reads the contracts.

*/

type ContractsContextType = {
  generalContracts: {
    solace?: Contract | null
    xSolace?: Contract | null
    xSolaceV1?: Contract | null
    xsLocker?: Contract | null
    stakingRewardsV2?: Contract | null
    xSolaceMigrator?: Contract | null
    depositHelper?: Contract | null
    gaugeController?: Contract | null
    uwLockVoting?: Contract | null
    uwLocker?: Contract | null
    uwp?: Contract | null
    uwe?: Contract | null
    fluxMegaOracle?: Contract | null
    solaceMegaOracle?: Contract | null
    bribeController?: Contract | null
  }
  contractSources: ContractSources[]
}

const ContractsContext = createContext<ContractsContextType>({
  generalContracts: {
    solace: undefined,
    xSolace: undefined,
    xSolaceV1: undefined,
    xsLocker: undefined,
    stakingRewardsV2: undefined,
    xSolaceMigrator: undefined,
    depositHelper: undefined,
    gaugeController: undefined,
    uwLockVoting: undefined,
    uwLocker: undefined,
    uwp: undefined,
    uwe: undefined,
    fluxMegaOracle: undefined,
    solaceMegaOracle: undefined,
    bribeController: undefined,
  },
  contractSources: [],
})

export function ContractsManager(props: PropsWithChildren): JSX.Element {
  const { activeNetwork } = useNetwork()
  const contractSources = useContractArray(activeNetwork)
  const generalContracts = useMemo(() => activeNetwork.config.generalContracts, [activeNetwork])

  const solace = useGetContract(generalContracts.solace)
  const xSolace = useGetContract(generalContracts.xSolace)
  const xSolaceV1 = useGetContract(generalContracts.xSolaceV1)
  const xsLocker = useGetContract(generalContracts.xsLocker)
  const stakingRewardsV2 = useGetContract(generalContracts.stakingRewardsV2)
  const xSolaceMigrator = useGetContract(generalContracts.xSolaceMigrator)
  const depositHelper = useGetContract(generalContracts.depositHelper)
  const gaugeController = useGetContract(generalContracts.gaugeController)
  const uwLockVoting = useGetContract(generalContracts.uwLockVoting)
  const uwLocker = useGetContract(generalContracts.uwLocker)
  const uwp = useGetContract(generalContracts.uwp)
  const uwe = useGetContract(generalContracts.uwe)
  const fluxMegaOracle = useGetContract(generalContracts.fluxMegaOracle)
  const solaceMegaOracle = useGetContract(generalContracts.solaceMegaOracle)
  const bribeController = useGetContract(generalContracts.bribeController)

  const value = useMemo<ContractsContextType>(
    () => ({
      generalContracts: {
        solace,
        xSolace,
        xSolaceV1,
        xsLocker,
        stakingRewardsV2,
        xSolaceMigrator,
        depositHelper,
        gaugeController,
        uwLockVoting,
        uwLocker,
        uwp,
        uwe,
        fluxMegaOracle,
        solaceMegaOracle,
        bribeController,
      },
      contractSources,
    }),
    [
      solace,
      xSolace,
      xSolaceV1,
      xsLocker,
      stakingRewardsV2,
      xSolaceMigrator,
      depositHelper,
      gaugeController,
      uwLockVoting,
      uwLocker,
      uwp,
      uwe,
      fluxMegaOracle,
      bribeController,
      solaceMegaOracle,
      contractSources,
    ]
  )

  return <ContractsContext.Provider value={value}>{props.children}</ContractsContext.Provider>
}

// To get access to this Manager, import this into your component or hook
export function useContracts(): ContractsContextType {
  return useContext(ContractsContext)
}
