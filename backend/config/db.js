//Import mongoose act as a bridge to the MongoDB database 
const mongoose = require('mongoose');

//Create a function that will attempt to connect to the database[MongoDB]
// we use 'async' because connecting to the database takes time, so we have to wait for it.
const connectDB = async () => {
    try {
        //Try to connect using our secret address from the '.env' file
        await mongoose.connect(process.env.MONGO_URI);
        console.log(`DB connected successfuly`);
    } catch (error) {
        console.log(`Database Conncetion Failed!${error}`);

    }
};

//export this file so that server.js file use it
module.exports = connectDB;