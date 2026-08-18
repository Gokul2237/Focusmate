const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    points: {
        type: Number,
        default: 0
    },

    streak: {
        type: Number,
        default: 0
    },

    lastCompletedDate: {
        type: Date,
        default: null
    },

    badges: {
        type: [String],
        default: []
    }

},
{
    timestamps: true
});


module.exports = mongoose.model(
    "User",
    userSchema
);