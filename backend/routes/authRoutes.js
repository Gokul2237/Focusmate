const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = express.Router();


// =========================
// Register User
// =========================

router.post("/register", async (req, res) => {

    console.log("Register Request Received");
    console.log(req.body);

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {

            return res.status(400).json({
                message: "User already exists"
            });

        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({

            name,
            email,
            password: hashedPassword

        });

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

        console.error(error);

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

    try {

        const { email, password } = req.body;
        console.log("Login Email:", email);

const users = await User.find();
console.log("All Users:", users);
        const user = await User.findOne({ email });

        if (!user) {

            return res.status(404).json({

                message: "User not found"

            });

        }

        const match = await bcrypt.compare(

            password,
            user.password

        );

        if (!match) {

            return res.status(400).json({

                message: "Invalid Password"

            });

        }

        const token = jwt.sign(

            { id: user._id },

            process.env.JWT_SECRET,

            {

                expiresIn: "7d"

            }

        );

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

        console.error(error);

        res.status(500).json({

            message: "Server Error",
            error: error.message

        });

    }

});

module.exports = router;