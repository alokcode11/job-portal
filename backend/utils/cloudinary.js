const cloudinary = require('cloudinary').v2;
const dotenv = require('dotenv');

dotenv.config();  // .config load the .env file --> load it into process.env [Now it is available under the Node.js]

// Securely logs into your cloudinary account
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,  // process.env make it secret // process.env.CLOUD_NAME --> Environment variables object se API_KEY lao
    api_key: process.env.API_KEY,        // process -> Global Object 
    api_secret: process.env.API_SECRET   // process.env -> Environment variable ka object console.log(process.env)
}); // IT tell cloudinary that this is my credientials please authenticate me 

module.exports = cloudinary;

