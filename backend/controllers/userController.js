const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        if (!name || !email || !password || !role) {
            return res.status(400).json({ message: "Please fill all fields!" });
        }

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashPassword,
            role
        });

        res.status(201).json({
            message: "User registered successfully",
            success: true,
            UserCreated: newUser
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // step A: If anything blank 
        if (!email || !password) {
            return res.status(400).json({ message: "Please enter email and password" });
        }

        // step B: see that this email is exist in our database or not 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        //step C : Compare the typed password with the scrambled password in the DB
        // bcrypt handles the complex math to check if they match!
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect email or password" });
        }

        // Step D: Create the VIP Wristband (JWT Token)
        const tokenData = {
            userId: user._id /// We store their unique database ID securely inside the wristband
        };
        // We "sign" the token using the secret key we put in our .env file. It expires in 1 day ('1d')
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        // Step E: Give the user the wristband securely via a "Cookie"
        return res.status(200).cookie("token", token, {
            maxAge: 1 * 24 * 60 * 60 * 1000, // Makes the cookie last exactly 1 day
            httpOnly: true, // Super Security Feature: prevents hackers from stealing the cookie
            sameSite: 'strict'
        }).json({
            message: `Welcome back, ${user.name}!`,
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
};

module.exports = { registerUser, loginUser };