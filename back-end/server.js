//run 'nodemon' for continuous build :-) 
const model = require('./model/Model');
const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('is running dude'));

app.listen(port, () => console.log(`dab on em we listenin on port ${port}`));

//example of connecting to server
const uri = "mongodb+srv://unlvparking:FsaFB21eTuI0ud6j@parkinn-lkp9z.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("parkinn").collection("user");
  // perform actions on the collection object
  client.close();
});
