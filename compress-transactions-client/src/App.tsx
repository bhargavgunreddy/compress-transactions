import React, { useEffect, useState } from 'react';
import './App.scss';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import { TransactionsGrid } from './components/TransactionsGrid';
import { Button, Grid } from '@material-ui/core';
import { CSVLink } from "react-csv";
import Container from '@mui/material/Container';
import AddTransactionModal from './components/AddTransactionModal';
import { LoginResponseType, TransactionResponse, TransactionRow } from './types';
import LoginComponent from './components/LoginComponent';

const App = () => {

  const [payingTransactions, setPayingTransactions] = useState<TransactionRow[]>([]);
  const [receivingTransactions, setReceivingTransactions] = useState<TransactionRow[]>([]);
  const [open, setOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [fileData, setFileData] = useState('');

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


  const downloadFile = () => {
    const downloadLink = document.getElementById('download-csv');
    downloadLink?.click()
  }

  const handleCompressTransactions = () => {
    fetch('/compress-transactions', {
      method: 'POST',
    })
      .then((response) => response.text())
      .then((response) => {
        setFileData(response);
        alert(`The csv file will be downlaoded shortly`);
        setTimeout(() => {

          downloadFile();
        }, 1000);
      }).catch((err) => console.log('Unable to load transactions at this point', err));
  }

  const handleLogin = (response: LoginResponseType) => {
    console.log(response);
    if (response.error) {
      alert('Failed to login. Use admin/admin to login');
    } else if (response.success) {
      setIsLoggedIn(true);
    }
  }

  if (!isLoggedIn) {
    return <LoginComponent handleLogin={handleLogin}></LoginComponent>
  }

  return (
    <Container maxWidth="lg" className='outline' sx={{ padding: '2%', border: '1px solid gray', borderRadius: '10px' }}>
      <Grid container spacing={1}
        justifyContent="center"
        alignContent="center"
        alignItems='center'
      >
        <Grid item xs={6} sm={6} lg={6}>
          <h3>Compress Transactions App</h3>
        </Grid>
        <Grid item xs={2} sm={2} lg={2}>
          <Grid container justifyContent="center" alignContent='center'
            alignItems='center'>
            <Grid item>

              <Button variant="contained" color="primary"
                id="logout" onClick={() => setIsLoggedIn(false)}>
                Logout
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={2} justifyContent="space-evenly"
        alignContent="space-around"
      >
        <TransactionsGrid rowData={payingTransactions} label='Paying'></TransactionsGrid>
        <TransactionsGrid rowData={receivingTransactions} label='Receiving'></TransactionsGrid>
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
              <Button variant="contained" color="primary" id="compress-transaction"
                onClick={handleCompressTransactions}>
                Compress transactions</Button>
            </Grid>
          </Grid>
        </Grid>
        <CSVLink
          data={fileData as any}
          filename={"my-file.csv"}
          id='download-csv'
          className="btn btn-primary"
          target="_blank"
        >
          Download me
        </CSVLink>
        <AddTransactionModal open={open} setOpen={setOpen}
          handleClose={() => setOpen(false)}
          addTransaction={addTransaction}></AddTransactionModal>
      </Grid>
    </Container>
  );
}

export default App;
