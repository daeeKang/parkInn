//run 'nodemon' for continuous build :-) 
const express = require('express')
const MongoClient = require('mongodb').MongoClient;
const app = express()
const port = 3000

app.get('/', (req, res) => res.send('is running dude'))

app.listen(port, () => console.log(`dab on em we listenin on port ${port}`))

//example of connecting to server
const uri = "mongodb+srv://<username>:<password>@parkinn-lkp9z.azure.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});