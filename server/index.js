const express = require("express");
const morganBody = require('morgan-body');
const bodyParser = require('body-parser');
const path = require('path');
var fs = require('fs');

const PORT = process.env.PORT || 3001;

const app = express();
// app.use(bodyParser.urlencoded({
//   extended: true
// }));
// app.use(bodyParser.json());
morganBody(app);

app.use(express.json());


app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get("/fetch-transactions", (req, res) => {

  console.log("fetch transacs req");
  res.json({ payingTransactions: [{
    transaction: 'abc', amount: -1500
  }, {
    transaction: 'def', amount: -500
  }, {
    transaction: 'abc', amount: -500
  }],
  receivingTransactions : [{
    transaction: 'abc', amount: 500
  }, {
    transaction: 'def', amount: 1500
  }, {
    transaction: 'abc', amount: 500
  }]
 });
});

app.post("/add-transaction", (req, res) => {

});

app.get("/api", (req, res) => {
  console.log("req api");
  res.json({ message: "Hello from server!" });
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});


app.post("/compress-transactions", (req, res) => {
  // var dataToWrite;

  // fs.writeFile('form-tracking/formList.csv', req.body, 'utf8', function (err) {
  //   if (err) {
  //     console.log('Some error occured - file either not saved or corrupted file saved.');
  //   } else {
  //     console.log('It\'s saved!');
  //   }
  // });

  let arr = req.body;
  const map = new Map();
  console.log(req);
for(let i= 0; i< arr.length; i++){
  map.set(arr[i][0], arr[i][1]);
}

  var myStr = ""
  // Creating header
  for(let key of map.keys()){
    myStr += key+","
  } 
  myStr = myStr.slice(0,-1)+"\r\n";

  const [firstValue] = map.values();

   // Creating each row
 for(let i = 0; i<firstValue.length; i++){
  var row = ""
  for(let key of map.keys()){
   if(map.get(key)[i]){
    row += map.get(key)[i]+","
   }else{
     row += ","
   }
  }
  myStr += row.slice(0, -1)+"\r\n";
 }

 console.log(myStr);
  fs.writeFileSync('./mycsv.csv',myStr);
res.send('mycsv.csv');

});

app.post('/login', (req, res) => {
  let username = req.body.username;
  let password = req.body.password;
  if (username === 'admin' && password === 'admin') {
      res.send('Login successful');
  }
  else {
      res.send('Login failed');
  }
});