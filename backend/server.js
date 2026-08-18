// FocusMate Backend
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const profileRoutes = require("./routes/profileRoutes");

const app = express();


// ======================
// Middlewares
// ======================

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));


// ======================
// Debug
// ======================

console.log("================================");
console.log("Mongo URI:", process.env.MONGO_URI);
console.log("Port:", process.env.PORT);
console.log("================================");


// ======================
// MongoDB Connection
// ======================

mongoose
.connect(process.env.MONGO_URI)
.then(() => {

    console.log("✅ MongoDB Connected Successfully");

})
.catch((err) => {

    console.log("❌ MongoDB Connection Failed");

    console.log(err);

});


// ======================
// Routes
// ======================

app.use("/api/auth", authRoutes);

app.use("/api/tasks", taskRoutes);

app.use("/api/analytics", analyticsRoutes);

app.use("/api/profile", profileRoutes);


// ======================
// Home Route
// ======================

app.get("/", (req, res) => {

    res.send("🚀 FocusMate Backend Running");

});


// ======================
// Start Server
// ======================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`🚀 Server running on port ${PORT}`);

});