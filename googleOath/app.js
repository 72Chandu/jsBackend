const express = require("express");
const app = express();
const connectToDB = require("./config/mongoose-connection");
require("dotenv").config();
const passport = require("passport");
const expressSession = require("express-session");

// Connect to the database
connectToDB();
require("./config/googleStrategy");

// Load authentication routes
const authrouter = require("./routes/authrouter");

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Initialize express-session middleware
app.use(expressSession({
    secret: process.env.EXPRESS_SECRET,
    resave: false,
    saveUninitialized: false,
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authrouter);
app.listen(3000, () => {
    console.log("Server running on port 3000");
});
//http://localhost:3000/auth/google