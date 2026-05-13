const jwt = require("jsonwebtoken");

const isAuthenticated = async (req, res, next) => {
    try {
        // 1.check if the user has a token in their cookies 
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated. Please log in.", success: false });
        }

        // 2. Verify that the token is real and wasn't forged by a hacker
        const decode = await jwt.verify(token, process.env.SECRET_KEY);
        if (!decode) {
            return res.status(401).json({ message: "Invalid token", success: false });
        }

        // 3. If it's valid, we attach their ID to the request so the controller knows who they are
        req.id = decode.userId; 

        // 4. 'next()' tells the server: "They passed the security check, let them through to the controller!"
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }

}

module.exports = isAuthenticated;