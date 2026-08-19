const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

const router = express.Router();


// =========================
// Register User
// =========================

router.post("/register", async (req, res) => {

    console.log("Register Request Received");

    try {

        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {

            return res.status(400).json({
                message: "Name, email and password are required"
            });

        }

        // Check existing user
        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        // Hash password
        const hashedPassword = await bcrypt.hash(
            password,
            10
        );

        // Create user
        const user = await User.create({

            name,

            email: email.toLowerCase(),

            password: hashedPassword

        });

        console.log("User Registered:", user.email);

        res.status(201).json({

            message: "User Registered Successfully",

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                points: user.points,

                streak: user.streak,

                badges: user.badges

            }

        });

    } catch (error) {

        console.error("REGISTER ERROR:", error);

        res.status(500).json({

            message: "Server Error",

            error: error.message

        });

    }

});


// =========================
// Login User
// =========================

router.post("/login", async (req, res) => {

    console.log("================================");
    console.log("Login Request Received");
    console.log("================================");

    try {

        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {

            return res.status(400).json({

                message: "Email and password are required"

            });

        }

        console.log("Login Email:", email);


        // Find user
        const user = await User.findOne({

            email: email.toLowerCase()

        });


        if (!user) {

            console.log("User not found");

            return res.status(404).json({

                message: "User not found"

            });

        }


        // Compare password
        const match = await bcrypt.compare(

            password,

            user.password

        );


        if (!match) {

            console.log("Invalid password");

            return res.status(400).json({

                message: "Invalid Password"

            });

        }


        // Check JWT secret
        if (!process.env.JWT_SECRET) {

            console.error(
                "JWT_SECRET is missing from environment variables"
            );

            return res.status(500).json({

                message: "JWT configuration error"

            });

        }


        // Create JWT token
        const token = jwt.sign(

            {
                id: user._id

            },

            process.env.JWT_SECRET,

            {
                expiresIn: "7d"
            }

        );


        console.log("Login Successful:", user.email);


        // Send response
        res.status(200).json({

            message: "Login Successful",

            token,

            user: {

                _id: user._id,

                name: user.name,

                email: user.email,

                points: user.points,

                streak: user.streak,

                badges: user.badges

            }

        });


    } catch (error) {

        console.error("LOGIN ERROR:", error);

        res.status(500).json({

            message: "Server Error",

            error: error.message

        });

    }

});


module.exports = router;