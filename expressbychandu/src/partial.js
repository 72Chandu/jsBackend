// D:\createfileWithCmd\expressbychandu\src\partial.js
const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = 8000;

// Define paths for Express config
const staticPath = path.join(__dirname, "../public");
const templatePath = path.join(__dirname, "../templates/partials/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", templatePath);
hbs.registerPartials(partialsPath);
// Template engine route
app.get("/", (req, res) => {
    res.render("partialIndex", {
        // Pass any necessary data to your template here
    });
});
app.get("*",(req,res)=>{
    res.render("404",{
        errorcomment:'oops page couldnt found'
    });
});
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
