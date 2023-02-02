import { useCache, useGeneral, useNetwork, useNotifications } from '../../context'
import { TransactionReceipt, TransactionResponse } from '@ethersproject/providers'
import { LocalTx } from '../../constants/types'
import { TransactionCondition, FunctionName } from '../../constants/enums'

export const useTransactionExecution = () => {
  const { negativeReload, positiveReload, appTheme } = useGeneral()
  const { addLocalTransactions } = useCache()
  const { makeTxToast } = useNotifications()
  const { activeNetwork } = useNetwork()

  const handleToast = async (tx: TransactionResponse | null, localTx: LocalTx | null, toastId?: string) => {
    if (!tx || !localTx) return false
    addLocalTransactions(localTx)
    negativeReload()
    if (toastId) makeTxToast(localTx.type, TransactionCondition.PENDING, appTheme, toastId, localTx.hash)
    return await tx.wait(activeNetwork.rpc.blockConfirms).then((receipt: TransactionReceipt) => {
      const status = receipt.status ? TransactionCondition.SUCCESS : TransactionCondition.FAILURE
      if (toastId) makeTxToast(localTx.type, status, appTheme, toastId, localTx.hash)
      positiveReload()
      return status == TransactionCondition.SUCCESS ? true : false
    })
  }

  const handleContractCallError = (functionName: string, err: any, txType: FunctionName, toastId?: string) => {
    console.log(functionName, err)
    if (toastId) makeTxToast(txType, TransactionCondition.CANCELLED, appTheme, toastId, undefined, err)
    negativeReload()
  }

  return { handleToast, handleContractCallError }
}
