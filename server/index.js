const express = require("express");
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const path = require('path');
var fs = require('fs');
const HandyStorage = require('handy-storage');

// Use this to persis the data to local storage and use it
const storage = new HandyStorage('./transactions.json');

const PORT = process.env.PORT || 3001;

const app = express();
morganBody(app);


app.use(express.static(path.resolve(__dirname, '../client/build')));


// if (process.env.NODE_ENV === "production" || process.env.NODE_ENV === "production") {
//   app.use(express.static("build"));
//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "build", "index.html"));
//   });
// }
app.get("/fetch-transactions", (req, res) => {

  res.json(storage.state);
});

app.post("/add-transaction", (req, res) => {
  let currentAmount = req.body.amount;

  let currentTransaction = {
    transaction: req.body.transaction,
    amount: currentAmount
  };

  let updatedTransactions = [];
  if (currentAmount >= 0) {

    updatedTransactions = storage.state.receivingTransactions.concat(currentTransaction),
      storage.setState({
        receivingTransactions: updatedTransactions
      });
  } else {
    updatedTransactions = storage.state.payingTransactions.concat(currentTransaction),

      storage.setState({
        payingTransactions: updatedTransactions
      });
  }

  storage.save({ sync: true }).then((res) => console.log(res));

  res.json(storage.state);
});

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});


app.get("/compress-transactions", (req, res) => {

  var myStr = ""
  const receivingTransactionsMap = new Map();
  const payingTransactionsMap = new Map();


  // Sum amounts in each section based on the transaction party
  storage.state.receivingTransactions.forEach((transactionIterator) => {
    const currentKey = transactionIterator.transaction;
    if (receivingTransactionsMap.has(currentKey)) {
      const currentAmount = receivingTransactionsMap.get(currentKey);
      receivingTransactionsMap.set(currentKey, currentAmount + transactionIterator.amount);
    } else {
      receivingTransactionsMap.set(currentKey, transactionIterator.amount);

    }
  });

  storage.state.payingTransactions.forEach((transactionIterator) => {
    const currentKey = transactionIterator.transaction;
    if (payingTransactionsMap.has(currentKey)) {
      const currentAmount = payingTransactionsMap.get(currentKey);
      payingTransactionsMap.set(currentKey, currentAmount + transactionIterator.amount);
    } else {
      payingTransactionsMap.set(currentKey, transactionIterator.amount);

    }
  });


  let finalTransactionsMap = new Map();
  // Pull all keys into one object for final transactions
  for (const [key, value] of receivingTransactionsMap.entries()) {
    if (payingTransactionsMap.has(key)) {
      finalTransactionsMap.set(key, receivingTransactionsMap.get(key) + payingTransactionsMap.get(key));
      payingTransactionsMap.delete(key)
    } else {
      finalTransactionsMap.set(key, payingTransactionsMap.get(key));
    }
  }

  // Add the unique keys back
  for (const [key, value] of payingTransactionsMap.entries()) {
    finalTransactionsMap.set(key, payingTransactionsMap.get(key));
  }
  // map.set('receivingTransactions', storage.state.receivingTransactions);
  // map.set('payingTransactions', storage.state.payingTransactions)

  // Creating header
  let map = finalTransactionsMap;
  for (let key of map.keys()) {
    myStr += key + ","
  }
  myStr = myStr.slice(0, -1) + "\r\n";

  const [firstValue] = map.values();

  let row = '';
  for (let value of map.values()) {
    row += value + ","
  }

  myStr += row.slice(0, -1) + "\r\n";

  // output
  console.log({ myStr });
  fs.writeFileSync('./mycsv.csv', myStr);
  res.json({ message: 'Success' });

});

// Login route
app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username === 'admin' && password === 'admin') {
    res.send({ message: 'Login successful' });
  }
  else {
    res.send({ error: 'Login failed' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
