import { Dispatch, SetStateAction } from "react";

export interface AddTransactionModalProps {
    handleClose: () => void;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>,
    addTransaction: (response: TransactionResponse) => void
}

export type TransactionRow = {
    'transaction': string,
    'amount': number
};

export interface TransactionsGridProps {
    rowData: Array<TransactionRow>;
    label: string
}

export interface TransactionResponse {
    payingTransactions: [],
    receivingTransactions: []
  }


  export type LoginResponseType = {
    error?: string, success?: string
  }
  
  export interface LoginComponentProps{
    handleLogin: (response: LoginResponseType) => void;
  }