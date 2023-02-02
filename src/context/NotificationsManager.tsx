import React, {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useEffect,
  useState,
  useRef,
  useCallback,
} from 'react'
import { ToastContainer, toast, Theme } from 'react-toastify'

// import 'animate.css/animate.min.css'
import 'react-toastify/dist/ReactToastify.css'
import '../styles/toast.css'
import { TransactionCondition, Error } from '../constants/enums'

import { AppToast, TransactionToast } from '../components/molecules/Toast'
// import { StyledWarning } from '../components/atoms/Icon'
import { useWeb3React } from '@web3-react/core'
import { ErrorData } from '../constants/types'
import { useGeneral } from './GeneralManager'

/*
This manager allows for notifications to be created. such notifications can be created
on trigger or manually. Error are also tracked so appropriate notifications can be shown but 
they can also be used elsewhere in the app for other purposes, such as disabling a certain feature
if an error occurs.
*/

type ToastSystemContextType = {
  makeTxToast: (
    txType: string,
    condition: TransactionCondition,
    theme: 'light' | 'dark',
    toastId?: string,
    txHash?: string,
    errObj?: any
  ) => void
  makeAppToast: (parsedData: ErrorData, id: Error, appToast: JSX.Element, toastConfig: any) => void
  addErrors: (errorsToAdd: ErrorData[]) => void
  removeErrors: (errorToRemove: Error[]) => void
  toastSettings: {
    txSuccess: any
    txError: any
    appNotice: any
    appError: any
  }
}

const ToastsContext = createContext<ToastSystemContextType>({
  makeTxToast: () => undefined,
  makeAppToast: () => undefined,
  addErrors: () => undefined,
  removeErrors: () => undefined,
  toastSettings: {
    txSuccess: undefined,
    txError: undefined,
    appNotice: undefined,
    appError: undefined,
  },
})

export function ToastsProvider(props: PropsWithChildren): JSX.Element {
  const { appTheme } = useGeneral()
  const [errors, setErrors] = useState<string[]>([])
  const { account } = useWeb3React()
  const [errorMap, setErrorMap] = useState(new Map())
  const lastAccount = useRef<string>('')

  const txSuccess = {
    autoClose: 10000,
    type: toast.TYPE.SUCCESS,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeOnClick: false,
    closeButton: true,
    // theme: 'colored' as Theme,
    className: 'success-toast',
    isLoading: false,
  }

  const txWarn = {
    autoClose: 10000,
    type: toast.TYPE.WARNING,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeOnClick: false,
    closeButton: true,
    // theme: 'colored' as Theme,
    className: 'warn-toast',
    isLoading: false,
  }

  const txError = {
    autoClose: 10000,
    type: toast.TYPE.ERROR,
    position: toast.POSITION.BOTTOM_RIGHT,
    closeOnClick: false,
    closeButton: true,
    // theme: 'colored' as Theme,
    className: 'error-toast',
    isLoading: false,
  }

  const appNotice = {
    type: toast.TYPE.INFO,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: false,
    closeOnClick: false,
    closeButton: true,
    // theme: 'colored' as Theme,
    className: 'info-toast',
    isLoading: false,
  }

  const appError = {
    type: toast.TYPE.ERROR,
    position: toast.POSITION.BOTTOM_RIGHT,
    autoClose: false,
    closeOnClick: false,
    closeButton: true,
    // theme: 'colored' as Theme,
    className: 'error-toast',
    isLoading: false,
  }

  const addErrors = useCallback((errorsToAdd: ErrorData[]) => {
    if (errorsToAdd.length == 0) return

    // convert input data into JSON string array
    const stringifiedErrorData = errorsToAdd.map((error) => JSON.stringify(error))

    setErrors([...stringifiedErrorData, ...errors].filter((v, i, s) => s.indexOf(v) === i))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const removeErrors = useCallback((errorsToRemove: Error[]) => {
    if (errorsToRemove.length == 0) return

    // convert cached data into JSON object to compare types, then remove those from cache whose types match
    const updatedErrors = errors.filter(
      (error: string) => !errorsToRemove.includes((JSON.parse(error) as ErrorData).type)
    )
    setErrors(updatedErrors)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const makeTxToast = useCallback(
    (
      txType: string,
      condition: TransactionCondition,
      theme: 'light' | 'dark',
      toastId?: string,
      txHash?: string,
      errObj?: any
    ) => {
      const _toast = <TransactionToast txType={txType} condition={condition} txHash={txHash} errObj={errObj} />
      console.log(appTheme)
      switch (condition) {
        case 'Complete':
          if (toastId) {
            if (toast.isActive(toastId)) {
              toast.update(toastId, {
                render: _toast,
                ...txSuccess,
              })
            } else {
              toast(_toast, {
                toastId,
                ...txSuccess,
              })
            }
          }
          break
        case 'Incomplete':
          if (toastId) {
            if (toast.isActive(toastId)) {
              toast.update(toastId, {
                render: _toast,
                ...txError,
              })
            } else {
              toast(_toast, {
                toastId,
                ...txError,
              })
            }
          }
          break
        case 'Cancelled':
          if (toastId) {
            if (toast.isActive(toastId)) {
              toast.update(toastId, {
                render: _toast,
                ...txWarn,
              })
            } else {
              toast(_toast, {
                toastId,
                ...txWarn,
              })
            }
          }
          break
        case 'Pending':
          if (toastId) {
            toast.loading(_toast, {
              toastId,
              type: toast.TYPE.INFO,
              autoClose: false,
              position: toast.POSITION.BOTTOM_RIGHT,
              closeOnClick: false,
              closeButton: true,
              className: 'info-toast',
              // theme: 'colored' as Theme,
            })
          }
          break
        default:
          toast(_toast, {
            ...txError,
          })
      }
    },
    []
  )

  const makeAppToast = useCallback(
    (parsedData: ErrorData, id: Error, appToast: JSX.Element, toastConfig: any) => {
      if (errorMap.get(parsedData.type) == parsedData.metadata.concat(parsedData.uniqueId)) return
      setErrorMap(new Map(errorMap.set(parsedData.type, parsedData.metadata.concat(parsedData.uniqueId))))
      if (toast.isActive(id)) {
        toast.update(id, {
          render: appToast,
          ...toastConfig,
        })
      } else {
        toast(appToast, {
          toastId: id,
          ...toastConfig,
        })
      }
    },
    [errorMap]
  )

  // Removes toasts from display on chainId or account change
  useEffect(() => {
    // if this is the first account, meaning the account went from undefined to valid, do
    // not dismiss toasts
    if (!account || !lastAccount.current) return
    lastAccount.current = account
    toast.dismiss()
  }, [account])

  useEffect(() => {
    if (!errors) return
    const unsupportedNetworkError = errors.find(
      (error) => (JSON.parse(error) as ErrorData).type == Error.UNSUPPORTED_NETWORK
    )
    if (unsupportedNetworkError) {
      const parsedError: ErrorData = JSON.parse(unsupportedNetworkError)
      makeAppToast(
        parsedError,
        Error.UNSUPPORTED_NETWORK,
        <AppToast message={`Unsupported network, please switch to a supported network`} />,
        appError
      )
    } else {
      setErrorMap(new Map(errorMap.set(Error.UNSUPPORTED_NETWORK, undefined)))
      toast.dismiss(Error.UNSUPPORTED_NETWORK)
    }

    const noProviderError = errors.find((error) => (JSON.parse(error) as ErrorData).type == Error.NO_PROVIDER)
    if (noProviderError) {
      const parsedError: ErrorData = JSON.parse(noProviderError)
      makeAppToast(
        parsedError,
        Error.NO_PROVIDER,
        <AppToast message={`No Ethereum browser extension detected`} />,
        appError
      )
    } else {
      setErrorMap(new Map(errorMap.set(Error.NO_PROVIDER, undefined)))
      toast.dismiss(Error.NO_PROVIDER)
    }

    const noAccessError = errors.find((error) => (JSON.parse(error) as ErrorData).type == Error.NO_ACCESS)
    if (noAccessError) {
      const parsedError: ErrorData = JSON.parse(noAccessError)
      makeAppToast(
        parsedError,
        Error.NO_ACCESS,
        <AppToast message={`Please authorize this website to access your account`} />,
        appError
      )
    } else {
      setErrorMap(new Map(errorMap.set(Error.NO_ACCESS, undefined)))
      toast.dismiss(Error.NO_ACCESS)
    }

    const walletNetworkUnsyncError = errors.find(
      (error) => (JSON.parse(error) as ErrorData).type == Error.WALLET_NETWORK_UNSYNC
    )
    if (walletNetworkUnsyncError) {
      const parsedError: ErrorData = JSON.parse(walletNetworkUnsyncError)
      makeAppToast(
        parsedError,
        Error.WALLET_NETWORK_UNSYNC,
        <AppToast message={`Please ensure that the network on your wallet and the network on the Solace app match`} />,
        appError
      )
    } else {
      setErrorMap(new Map(errorMap.set(Error.WALLET_NETWORK_UNSYNC, undefined)))
      toast.dismiss(Error.WALLET_NETWORK_UNSYNC)
    }

    const unknownError = errors.find((error) => (JSON.parse(error) as ErrorData).type == Error.UNKNOWN_WALLET_ERROR)
    if (unknownError) {
      const parsedError: ErrorData = JSON.parse(unknownError)
      makeAppToast(
        parsedError,
        Error.UNKNOWN_WALLET_ERROR,
        <AppToast message={`An unknown error occurred: ${parsedError.metadata}`} />,
        appError
      )
    } else {
      setErrorMap(new Map(errorMap.set(Error.UNKNOWN_WALLET_ERROR, undefined)))
      toast.dismiss(Error.UNKNOWN_WALLET_ERROR)
    }
  }, [errors])

  const value = useMemo<ToastSystemContextType>(
    () => ({
      makeTxToast,
      makeAppToast,
      addErrors,
      removeErrors,
      toastSettings: {
        txSuccess,
        txError,
        appNotice,
        appError,
      },
    }),
    []
  )

  return (
    <ToastsContext.Provider value={value}>
      <ToastContainer />
      {props.children}
    </ToastsContext.Provider>
  )
}

// To get access to this Manager, import this into your component or hook
export function useNotifications(): ToastSystemContextType {
  return useContext(ToastsContext)
}

export function NotificationsManager(props: PropsWithChildren): JSX.Element {
  return <ToastsProvider>{props.children}</ToastsProvider>
}
