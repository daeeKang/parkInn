const dotenv = require('dotenv');
const MongoClient = require('mongodb').MongoClient;
dotenv.config();
const collections = ['companies', 'customers', 'lots', 'parkingtimes', 'revenues', 'staffs', 'users', 'reservations'];
let collectionCount = 0;

MongoClient.connect(process.env.MONGO_URI, { useUnifiedTopology: true, useNewUrlParser: true }, function(err, db) {
    if (err) throw err;
    console.log('dab on em we connected to mongoDB');
    const database = db.db("parkinn");
    for(let i = 0; i < collections.length; i++){
        database.dropCollection(collections[i], () => {
            console.log(`dropped collection ${collections[i]}`);
            collectionCount++;
        });
    }
    for(let i = 0; i < collections.length; i++){
        database.createCollection(collections[i], () => {
            console.log(`created collection ${collections[i]}`);
            collectionCount++;
        });   
    }
    wait();
});

function wait(){
    if (collectionCount != collections.length * 2){
      setTimeout(wait, 1000);
    } else {
        console.log('dab on em we cleaned mongoDB');
        process.exit(0);
    }
}