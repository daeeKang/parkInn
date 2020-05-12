# ParkInn Back End
This is the back end for the parkinn project

## Installation
Installing the dependencies 
```bash
npm install
```

Make sure you have the .env file created with the right MONGO_URI
```bash
cp example.env .env
```

To run the back end server 
```bash
npm start
```

## Generating Test Data
The test data will already be populated in the database. But if extra documents are inserted into the database and you wish to start over, then run the following commands to get a base copy of the test data
```bash
npm run db:clean
```
This will drop all the collections and create the same collections to ensure there is no data in the db

```bash
npm run db:create
```
This will insert the following documents into the db

### Companies

MGM
Flamingo
Sapphire

### Lots

Each lot will have 100 parking spots and each spot with have an id of a single alphabetic character,    followed by a number.
alphabetic character = which floor the parking spot is on
numeric digit(s) = which position the parking spot is on the particular floor

The lot will also have a randomly generated location, that resides somewhere in Las Vegas

5 lots for MGM
2 lots for Flamingo
1 lot for Sapphire

### Revenue 

Each company will have 100 transactions for each of their lots. 

The revenue will have the price paid in pennies, and the date which is also randomly generated within the year of 2019

### Parking Times

The amount of people that parked per hour for a single day for each lot is generated.  There will be 30 days recorded for each lot for the month of December 2019

### Users

There will be 10 customer users, 3 staff users, and 3 admin users

The customers will have usernames ‘customer1’ to ‘customer10’

The staff will be staffMGM, staffFlamingo, and staffSapphire

The admin will be adminMGM, adminFlamingo, and adminSapphire

They will all have the password ‘password’
