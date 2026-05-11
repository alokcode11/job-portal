
//import .env file so that server.js file can read  it 
const dotenv = require('dotenv');
//now tell dotenv to actually run the .env file and load the secret file into our server's memory 
dotenv.config();


// we have created db.js so we also have to connect this with the server.js file 
const connectDB = require('./config/db') 



// now call the function to connect to the database!
connectDB();

// we have installed the express library/framework now we have to import that express library in the server.js file
// Express ---> It is used to create the server and handle the routesand handle the HTTP request and response
const express = require("express");

// Initialize the express application (Now app veriable is the variable that holds the express application is our server)
const app = express();



// Define the port on which server will run
// Normally it could be the 3000, 4000, 8000, 8080 etc. but we can change it if needed
const PORT = process.env.PORT || 3000;

// create the first route
// when someone vist "/" file then the server will reply a response  
app.get('/', (req, res) => {
    res.send('Hello from job jortal backend');
});

//Tell the server to start listining for the request on the defined port
app.listen(PORT, () => {
    console.log(`Server is running Successfully on the port ${PORT}`);
});
