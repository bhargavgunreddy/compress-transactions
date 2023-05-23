import React, { useEffect, useMemo, useState } from 'react';
import './App.scss';
import { AgGridReact } from 'ag-grid-react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { TransactionsGrid } from './components/TransactionsGrid';
import Modal from './components/AddTransactionModal';
import { Button, Grid } from '@material-ui/core';
import AddTransactionModal from './components/AddTransactionModal';
import Container from '@mui/material/Container';
import { Box } from '@mui/material';
import { TransactionRow } from './types';

const App = () => {


  const [payingTransactions, setPayingTransactions] = useState([{
    transaction: 'abc', amount: -500
  }, {
    transaction: 'def', amount: -500
  }, {
    transaction: 'abc', amount: -500
  }]);
  const [receivingTransactions, setReceivingTransactions] = useState([{
    transaction: 'abc', amount: 500
  }, {
    transaction: 'def', amount: 500
  }, {
    transaction: 'abc', amount: 500
  }]);

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const addTransaction = (transaction: TransactionRow) => {
    if (transaction.amount >= 0) {
      setReceivingTransactions(receivingTransactions.concat(transaction));
    } else {
      setPayingTransactions(payingTransactions.concat(transaction))
    }
  }

  // Each Column Definition results in one Column.


  // useEffect(() => {
  //   fetch('https://www.ag-grid.com/example-assets/row-data.json')
  //     .then(result => result.json())
  //     .then(rowData => setRowData(rowData))
  // }, []);


  const handleCompressTransactions = () => {
    const receivingTransactionsMap = new Map();
    const payingTransactionsMap = new Map();

    // Sum amounts in each section based on the transaction party
    receivingTransactions.forEach((transactionIterator: TransactionRow) => {
      const currentKey = transactionIterator.transaction;
      if (receivingTransactionsMap.has(currentKey)) {
        const currentAmount = receivingTransactionsMap.get(currentKey);
        receivingTransactionsMap.set(currentKey, currentAmount + transactionIterator.amount);
      } else {
        receivingTransactionsMap.set(currentKey, transactionIterator.amount);

      }
    });

    payingTransactions.forEach((transactionIterator: TransactionRow) => {
      const currentKey = transactionIterator.transaction;
      if (payingTransactionsMap.has(currentKey)) {
        const currentAmount = payingTransactionsMap.get(currentKey);
        payingTransactionsMap.set(currentKey, currentAmount + transactionIterator.amount);
      } else {
        payingTransactionsMap.set(currentKey, transactionIterator.amount);

      }
    });


    // Pull all keys into one object for final transactions
    for (const [key, value] of receivingTransactionsMap.entries()) {
      if (payingTransactionsMap.has(key)) {
        receivingTransactionsMap.set(key, receivingTransactionsMap.get(key) + payingTransactionsMap.get(key));
        payingTransactionsMap.delete(key)
      } else {
        receivingTransactionsMap.set(key, payingTransactionsMap.get(key));
      }
    }

    return receivingTransactionsMap;

  }

  return (
    <>
      <Grid container spacing={2} justifyContent="center"
        alignContent="space-around"
      >
        <TransactionsGrid rowData={payingTransactions as any} label='Paying'></TransactionsGrid>
        <TransactionsGrid rowData={receivingTransactions as any} label='Receiving'></TransactionsGrid>
      </Grid>
      <Grid container spacing={4} justifyContent='center'
        alignContent='space-around'>

        <Grid item xs={8} sm={4} lg={6}>
          <Button variant="contained" color="primary"
            id="add-transaction" onClick={handleOpen}>
            Add new transaction
          </Button>
        </Grid>

        <Grid item xs={8} sm={6} lg={6}>

          <Button variant="outlined" color="default" id="compress-transaction"
            onClick={handleCompressTransactions}>
            Compress transactions</Button>
        </Grid>
        <AddTransactionModal open={open} setOpen={setOpen}
          handleClose={() => setOpen(false)}
          addTransaction={addTransaction}></AddTransactionModal>
      </Grid>
    </>
  );
}

export default App;
