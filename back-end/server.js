const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const path = require('path');
const port = 9000;

//initial set up
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client/build')))
dotenv.config();

//bring in routes
const companyRoute =  require('./routes/Company');
const lotRoute =      require('./routes/Lot');
const customerRoute = require('./routes/Customer');

//tell app to use brought in routes
app.use('/Company', companyRoute);
app.use('/Lot', lotRoute);
app.use('/Customer', customerRoute);

//connect to mongodb
//if this isn't working, you don't have a .env file saved in this directory
Mongoose.connect(
  process.env.MONGO_URI
)

app.listen(port, () => console.log(`dab on em we listenin on port ${port}`));

//example of connecting to server

