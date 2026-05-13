const express = require('express');
const { registerUser, loginUser, logout, updateProfile } = require('../controllers/userController'); // type the name registerUser it auto suggest 
const isAuthenticated = require('../middleware/isAuthenticated'); // Import the Bouncer!


const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logout);
// Notice how isAuthenticated is placed in the MIDDLE! 
// Request -> Bouncer -> updateProfile Brain
userRouter.put('/profile/update', isAuthenticated, updateProfile); // authenticated then move to next()

module.exports = userRouter;
