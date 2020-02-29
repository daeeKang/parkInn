const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const port = 3000;
const db = Mongoose.connection;

//initial set up
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
dotenv.config();

//bring in routes
const companyRoute =  require('./routes/Company');
const lotRoute =      require('./routes/Lot');
const customerRoute = require('./routes/Customer');
const userRoute = require('./routes/User');

//tell app to use brought in routes
app.use('/Company', companyRoute);
app.use('/Lot', lotRoute);
app.use('/Customer', customerRoute);
app.use('/User', userRoute);

//connect to mongodb
//if this isn't working, you don't have a .env file saved in this directory
Mongoose.connect(
  process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
)
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('dab on em we connected to mongoDB');
}); 

app.listen(port, () => console.log(`dab on em we listenin on port ${port}`));

//example of connecting to server

