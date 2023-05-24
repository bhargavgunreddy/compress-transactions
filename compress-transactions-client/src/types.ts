import { Dispatch, SetStateAction } from "react";

export interface AddTransactionModalProps {
    handleClose: () => void;
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>,
    addTransaction: (transaction: TransactionRow) => void
}

export type TransactionRow = {
    'transaction': string,
    'amount': number
};

export interface TransactionsGridProps {
    rowData: Array<TransactionRow>;
    label: string
}
