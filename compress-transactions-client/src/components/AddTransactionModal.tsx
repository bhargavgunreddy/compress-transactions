import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@material-ui/core";
import { Close } from "@material-ui/icons";
import { AddTransactionModalProps } from "../types";


// This modal lets the user add transactions
const AddTransactionModal = (props: AddTransactionModalProps) => {
  const [stringField, setStringField] = useState("");
  const [numberField, setNumberField] = useState("");


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (stringField.trim() === "" || numberField.trim() === "") {
      alert("Both fields are required");
    } else {
      fetch('/add-transaction', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          transaction: stringField.trim(), amount: Number(numberField.trim()),
        })
      })
        .then((res) => res.json())
        .then((res) => {
          props.addTransaction(res);
          setStringField('');
          setNumberField('');
        }).catch((err) => {
          console.log(err);
          alert('Failed to save the transaction');
        });
      props.setOpen(false);
    }
  };

  const handleClose = () => {
    props.handleClose();
    setStringField('');
    setNumberField('');
  }

  return (
    <div>
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>
          Add transaction
          <Close onClick={handleClose} style={{ float: "right", cursor: "pointer" }} />
        </DialogTitle>
        <form onSubmit={handleSubmit}>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="String field"
              type="text"
              fullWidth
              value={stringField}
              onChange={(e) => setStringField(e.target.value)}
              required
            />
            <TextField
              margin="dense"
              label="Number field"
              type="number"
              fullWidth
              value={numberField}
              onChange={(e) => setNumberField(e.target.value)}
              required
            />
          </DialogContent>
          <DialogActions>
            <Button type="submit" color="primary">
              Submit
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}

export default AddTransactionModal;