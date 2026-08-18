const express = require("express");
const User = require("../models/user");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();


// ===============================
// GET LOGGED-IN USER PROFILE
// ===============================

router.get("/", authMiddleware, async (req, res) => {

    try {

        const user = await User.findById(req.user.id).select("-password");

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});

module.exports = router;