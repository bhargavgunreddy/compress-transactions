
### compress-transactions

Compress the list of given transactions based on balances

## Available Scripts

# To start the nodeJS server

1. npm i
2. npm start

## To run the client 
Navigate to the compress-transactions-client folder
1. npm i
2. npm start

This should run both the servers now  and hsould open localhost:3000 in the browser.


## Usage
1. You should see the login page and be able to login using
 username: admin
 password: admin

1. You should be able to to add a transaction using the add transaction button
2. This will show upa modal to add transaction with the name field and the amount field.
3. Based on the amount the transaction gets appended to either paying or receiving list
4. When you hit compress transactions, the csv file should be generated in the folder and also printed out in the node console for your convenience.


## Functinality
1. The compress transactions will loop through each list to get teh sum of amounts based on individual keys
2. We then check to see if the key is present in the other map as well and if yes addd both of them if not just take the value as is
3. The handy-storage npm package makes use of the json file to start with so each trasaction you add will persist 
