import React, { useState } from "react";
import { Button, Grid, DialogActions, TextField } from "@material-ui/core";
import { LoginComponentProps } from "../types";


// Login component has the logic to handle user login
// it will make the APi call and return if its a success or failure
// and return the response to parent component


const LoginComponent = (props: LoginComponentProps) => {

  const [userNameField, setUserNameField] = useState("");
  const [passwordField, setPasswordField] = useState("");


  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log("handle login")
    if (userNameField.trim() === "" || passwordField.trim() === "") {
      alert("Both fields are required");
    } else {
      fetch('/login', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: userNameField.trim(),
          password: passwordField.trim(),
        })
      })
        .then((res) => res.json())
        .then((res) => {
          props.handleLogin({ success: 'Login success' });

          setUserNameField('');
          setPasswordField('');
        }).catch((err) => {
          props.handleLogin({ error: 'Login failed' })
        });
    }
  };
  return (
    <Grid container spacing={2} justifyContent="center"
      alignItems="center"
    >
      <Grid item >
        <form onSubmit={handleSubmit}>
          <TextField
            autoFocus
            margin="dense"
            label="User name"
            type="text"
            fullWidth
            value={userNameField}
            onChange={(e) => setUserNameField(e.target.value)}
            required
          />
          <TextField
            margin="dense"
            label="Password"
            type="password"
            fullWidth
            value={passwordField}
            onChange={(e) => setPasswordField(e.target.value)}
            required
          />
          <DialogActions>
            <Button type="submit" color="primary">
              Login
            </Button>
          </DialogActions>
        </form>
      </Grid>
    </Grid>);
}

export default LoginComponent;