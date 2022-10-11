const { MongoClient } = require('mongodb');
require('dotenv').config();
const { MONGO_URI } = process.env;
// creates the client 
// set up the code to connect
const options = { 
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

const createClient = () => {
    const client = new MongoClient(MONGO_URI, options);
    const db = client.db("addMeToYourSchedule");
    return { client, db}
}

module.exports={createClient}