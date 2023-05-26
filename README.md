
### compress-transactions

Compress the list of given transactions based on balances and transaction party and return the final list

## Tech stack

1. This project uses React on front end and nodeJS on the backend.
2. It uses handy-storage npm package to persist the data which is supposed to use our local JSON file as data source (https://www.npmjs.com/package/handy-storage)

# To start the nodeJS server

1. npm i
2. npm start

## To run the client 

Navigate to the compress-transactions-client folder
1. npm i
2. npm start

This should run both the servers now and should open localhost:3000 in the browser.


## Usage
1. You should see the login page and be able to login using
 username: admin
 password: admin

1. You should be able to to add a transaction using the add transaction button
2. This will show up a modal to add transaction with the name field and the amount field.
3. Based on the amount the transaction gets appended to either paying or receiving list
4. When you hit compress transactions, the csv file should be generated and downloaded.


## Functinality
1. The compress transactions will loop through each list to get teh sum of amounts based on individual keys
2. We then check to see if the key is present in the other map as well and if yes addd both of them if not just take the value as is
3. The handy-storage npm package makes use of the json file to start with so each trasaction you add will persist 


## Live

The live functionality is hosted here https://compress-transactions.herokuapp.com/ 

Here is a sample video



https://github.com/bhargavgunreddy/compress-transactions/assets/6047374/e7948117-17dc-4032-ab28-a221bb05b846

### Note

1. Thanks for the opportunity to work on this assignmnet as I learnt new things about deploying to heroku,
downlaoding a csv etc. 
2. As i was mostly taking out time during the evenings and night, I didnot concentrate on adding the test cases or stying the components.
3. The heroku setup made me sweat so you might see recurring commits trying to fix the build config, in the end its just updating the correct folder name, i started off with client but updated it to compress-transactions-client
