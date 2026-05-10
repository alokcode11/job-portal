const mongoose = require('mongoose');

//1. create the blueprint for what a user must look like 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true // Must provide 
    },
    email: {
        type: String,
        required: true,
        unique: true  // no two user have the same email
    },
    password: {
        type: String,
        required: true // we will encrypt this password later 
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'], // user strictly must be of these two option
        required: true
    }
}, {
    // Magic Feature! It auto store the detail of date and time when user is created 
    timestamps: true

});

//2. we trun our blueprint [userSchema] into an actual active model that we can use in our server
const user = mongoose.model('user', userSchema);

//3. Export it so that other files can use or access it to create users
module.exports = user;