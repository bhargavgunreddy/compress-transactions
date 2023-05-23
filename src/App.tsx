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

          <Button variant="outlined" color="default" id="compress-transaction">
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
