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
            maxAge: 1 * 24 * 60 * 60 * 1000, // Makes the cookie last exactly 1 day -> in milliseconds
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

const logout = async (req, res) => {  // we have not made any req that why it is in dim and completely fine 
    try {
        // We log them out by replacing their token with an empty string and making it expire instantly (maxAge: 0)
        return res.status(200).cookie("token", " ", { maxAge: 0 }).json({
            message: "Logged out successfully",
            success: true
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error " });
    }
}

const updateProfile = async (req, res) => {
    try {
        const { name, email, phoneNumber, bio, skills } = req.body;

        // Remember: our Bouncer (isAuthenticated) attached the user's ID to req.id!
        const userId = req.id;

        // 1. Find the user in the database
        let user = await User.findById(userId);
        if (!user) {
            return res.status(400).json({ message: "User not found.", success: false });
        }
        // 2. If the user provided skills, convert them from a string into an array
        // e.g., "React, Node, MongoDB" -> ["React", "Node", "MongoDB"]
        let skillsArray;
        if (skills) {
            skillsArray = skills.split(",");
        }

        // 3. Update the data only if the user typed something new
        if (name) user.name = name;
        if (email) user.email = email;
        if (phoneNumber) user.phoneNumber = phoneNumber;
        if (bio) user.profile.bio = bio;
        if (skillsArray) user.profile.skills = skillsArray;

        // 4. Save the updated user back to the database
        await user.save();

        // 5. Send the updated data back to the frontend
        user = {
            _id: user._id,
            name: user.name,
            email: user.email,
            phoneNumber: user.phoneNumber,
            role: user.role,
            profile: user.profile
        };

        return res.status(200).json({
            message: "Profile updated successfully",
            user, // for live update otherwise we need refresh otherwise it reflect the previous data not the updated one 
            success: true
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}
module.exports = { registerUser, loginUser, logout, updateProfile }; 