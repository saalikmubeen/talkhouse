const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {

    try {
        const { username, email, password } = req.body;

        // check if user exists
        const userExists = await User.exists({ email: email.toLowerCase() });

        if (userExists) {
            return res.status(409).send("E-mail already in use.");
        }

        // encrypt password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // create user document and save in database
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // create JWT token
        const token = jwt.sign(
            {
                userId: user._id,
                email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d",
            }
        );

        res.status(201).json({
            userDetails: {
                _id: user._id,
                email: user.email,
                token: token,
                username: user.username, 
            },
        });
    } catch (err) {
        return res.status(500).send("Error occured. Please try again");
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res
                .status(400)
                .send("Invalid credentials. Please try again");
        }

        const passwordsMatch = await bcrypt.compare(password, user.password);

        if (!passwordsMatch) {
            return res
                .status(400)
                .send("Invalid credentials. Please try again");
        }

        // send new token
        const token = jwt.sign(
            {
                userId: user._id,
                email,
                username: user.username,
            },
            process.env.JWT_SECRET,
            {
                expiresIn: "15d",
                // expiresIn: 60,
            }
        );

        return res.status(200).json({
            userDetails: {
                _id: user._id,
                email: user.email,
                token: token,
                username: user.username,
            },
        });

    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again");
    }
};

module.exports = {
    login,
    register
}
