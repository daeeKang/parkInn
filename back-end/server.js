const express = require('express');
const bodyParser = require('body-parser');
const Mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const session = require('express-session');
const passport = require('passport');
const Auth0Strategy = require('passport-auth0');

const port = 8000;
const db = Mongoose.connection;

dotenv.config();

//configuring express-session
const sess = {
  secret: "puber",
  cookie: {},
  resave: false,
  saveUninitialized: true,
}

//Configure Passport to use Auth0
const strategy = new Auth0Strategy({
  domain: process.env.AUTH0_DOMAIN,
  clientID: process.env.AUTH0_CLIENT_ID,
  clientSecret: process.env.AUTH0_CLIENT_SECRET,
  callbackURL: process.env.AUTH0_CALLBACK_URL,
},
function (accessToken, refreshToken, extraParams, profile, done){
  return done(null, profile);
});
passport.use(strategy);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
});

//initial set up
app.use(session(sess));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());

//bring in routes
const companyRoute =  require('./routes/Company');
const lotRoute =      require('./routes/Lot');
const customerRoute = require('./routes/Customer');
const userRoute = require('./routes/User');
const staffRoute = require('./routes/Staff');
const authRoute = require('./routes/Auth');

//tell app to use brought in routes
app.use('/Staff', staffRoute);
app.use('/Company', companyRoute);
app.use('/Lot', lotRoute);
app.use('/Customer', customerRoute);
app.use('/User', userRoute);
app.use('/', authRoute);

//connect to mongodb
//if this isn't working, you don't have a .env file saved in this directory
Mongoose.connect(
  process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }
);
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('dab on em we connected to mongoDB');
}); 

app.listen(port, () => console.log(`dab on em we listenin on port ${port}`));

//example of connecting to server

