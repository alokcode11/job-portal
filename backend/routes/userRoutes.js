const express = require('express');
const { registerUser, loginUser, logout, updateProfile } = require('../controllers/userController'); // type the name registerUser it auto suggest 
const isAuthenticated = require('../middleware/isAuthenticated'); // Import the Bouncer!
const singleUpload = require('../middleware/multer');



const userRouter = express.Router();
//static Routes always on top 
userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/logout', logout);
// Notice how isAuthenticated is placed in the MIDDLE! 
// Request -> Bouncer -> updateProfile Brain
userRouter.put('/profile/update', isAuthenticated, updateProfile); // authenticated then move to next()

// Update this one line:
userRouter.put('/profile/update', isAuthenticated, singleUpload, updateProfile);
//dynamic routes come after the static routes always 



module.exports = userRouter;
