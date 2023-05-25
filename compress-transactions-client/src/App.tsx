import React, { useEffect, useState } from 'react';
import './App.scss';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { TransactionsGrid } from './components/TransactionsGrid';
import { Button, Grid } from '@material-ui/core';
import AddTransactionModal from './components/AddTransactionModal';
import { LoginResponseType, TransactionResponse, TransactionRow } from './types';
import LoginComponent from './components/LoginComponent';



const App = () => {

  const [payingTransactions, setPayingTransactions] = useState<TransactionRow[]>([]);
  const [receivingTransactions, setReceivingTransactions] = useState<TransactionRow[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const addTransaction = (response: TransactionResponse) => {
    setReceivingTransactions(response.receivingTransactions);
    setPayingTransactions(response.payingTransactions);
    alert('Transaction updated successfully');
  }

  useEffect(() => {
    fetch('/fetch-transactions')
      .then((result) => result.json())
      .then((rowData: TransactionResponse) => {
        setPayingTransactions(rowData.payingTransactions);
        setReceivingTransactions(rowData.receivingTransactions);
      });
  }, []);


  const handleCompressTransactions = () => {
    // const receivingTransactionsMap = new Map();
    // const payingTransactionsMap = new Map();

    // // Sum amounts in each section based on the transaction party
    // receivingTransactions.forEach((transactionIterator: TransactionRow) => {
    //   const currentKey = transactionIterator.transaction;
    //   if (receivingTransactionsMap.has(currentKey)) {
    //     const currentAmount = receivingTransactionsMap.get(currentKey);
    //     receivingTransactionsMap.set(currentKey, currentAmount + transactionIterator.amount);
    //   } else {
    //     receivingTransactionsMap.set(currentKey, transactionIterator.amount);

    //   }
    // });

    // payingTransactions.forEach((transactionIterator: TransactionRow) => {
    //   const currentKey = transactionIterator.transaction;
    //   if (payingTransactionsMap.has(currentKey)) {
    //     const currentAmount = payingTransactionsMap.get(currentKey);
    //     payingTransactionsMap.set(currentKey, currentAmount + transactionIterator.amount);
    //   } else {
    //     payingTransactionsMap.set(currentKey, transactionIterator.amount);

    //   }
    // });


    // let finalTransactionsMap = new Map();
    // // Pull all keys into one object for final transactions
    // for (const [key, value] of receivingTransactionsMap.entries()) {
    //   if (payingTransactionsMap.has(key)) {
    //     finalTransactionsMap.set(key, receivingTransactionsMap.get(key) + payingTransactionsMap.get(key));
    //     payingTransactionsMap.delete(key)
    //   } else {
    //     finalTransactionsMap.set(key, payingTransactionsMap.get(key));
    //   }
    // }

    // // Add the unique keys back
    // for (const [key, value] of payingTransactionsMap.entries()) {
    //   finalTransactionsMap.set(key, payingTransactionsMap.get(key));
    // }

    // console.log({ finalTransactionsMap });

    fetch('/compress-transactions', {
      method: 'POST',
      body: JSON.stringify(""),
    })
      .then((response) => response.json())
      .then((response) => {
        alert('The csv file is updated in the root folder with compressed transactions')
      }
      );

  }

  const handleLogin = (response: LoginResponseType) => {
    if (response.error) {
      alert('Failed to login');
    } else if (response.success) {
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    return <LoginComponent handleLogin={handleLogin}></LoginComponent>
  }

  return (
    <>
      <Grid container spacing={2} justifyContent="center"
        alignContent="space-around"
      >
        <Grid item xs={4} sm={4} lg={6}>
          <h3>Compress Transactions App</h3>
        </Grid>
        <Grid item xs={2} sm={4} lg={6}>

          <Button variant="contained" color="primary"
            id="logout" onClick={() => setIsLoggedIn(false)}>
            Logout
          </Button>
        </Grid>

      </Grid>
      <Grid container spacing={4} justifyContent="center"
        alignContent="space-around"
      >
        <TransactionsGrid rowData={payingTransactions as any} label='Paying'></TransactionsGrid>
        <TransactionsGrid rowData={receivingTransactions as any} label='Receiving'></TransactionsGrid>
      </Grid>
      <Grid container spacing={4} justifyContent='center'
        alignContent='space-around'>

        <Grid item xs={8} sm={4} lg={6}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8} sm={4} lg={6}>

              <Button variant="contained" color="primary"
                id="add-transaction" onClick={handleOpen}>
                Add new transaction
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={8} sm={6} lg={6}>
          <Grid container spacing={2} justifyContent="center">
            <Grid item xs={8} sm={4} lg={6}>
              <Button variant="outlined" color="default" id="compress-transaction"
                onClick={handleCompressTransactions}>
                Compress transactions</Button>
            </Grid>
          </Grid>
        </Grid>
        <AddTransactionModal open={open} setOpen={setOpen}
          handleClose={() => setOpen(false)}
          addTransaction={addTransaction}></AddTransactionModal>
      </Grid>
    </>
  );
}

export default App;
