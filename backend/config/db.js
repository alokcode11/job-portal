const mongoose = require('mongoose');

const connectDB = async () => {
    try {  
        const connectionInstance =  await mongoose.connect(process.env.MONGO_URI);
        console.log(`[DATABASE] MongoDB connected successfully || Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(`Database connection failed: ${error}`);
    }
};

module.exports = connectDB;