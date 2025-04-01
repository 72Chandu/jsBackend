const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", function (req, res) {
     res.render("index");
})// yeha pe tum form fill karoge jab submit karoge then data goes to backend
app.get("/check", function (req, res) { // route ks type get hai
     console.log(req.query);// you shaw the data of backend in terminal
      res.send("Working");
})// after submiting you see the data in url 
app.listen(3000);