/*const path=require("path")
const express=require("express");
const app=express();
// relative path static path
//console.log(__dirname);// give the path of of your working file (D:\createfileWithCmd\expressbychandu\src)
//console.log(path.join(__dirname, "../public"))//D:\createfileWithCmd\expressbychandu\public
const staticpath=path.join(__dirname, "../public");
app.use(express.static(staticpath));
const port=3000
app.listen(port,()=>{
    console.log("hum ne sun liya hai jo tu ne bola port pe")// console me
});*/
const express = require('express');
const path=require("path");
const app = express();
// Set the 'view engine' to use Handlebars
app.set('view engine', '.hbs');
const staticpath=path.join(__dirname, "../views");
// Serve static files from the 'public' directory
app.use(express.static(staticpath));
// Sample data of items
const items = [
    { id: 1, name: 'Item 1', description: 'Description of Item 1' },
    { id: 2, name: 'Item 2', description: 'Description of Item 2' },
    { id: 3, name: 'Item 3', description: 'Description of Item 3' }
];
// Define a route to render the home page
app.get('/', (req, res) => {
  res.render('index.hbs', { items });
});
// Define a route to get details of a specific item
app.get('/item/:id', (req, res) => {
  const itemId = parseInt(req.params.id);
  const item = items.find(item => item.id === itemId);
  if (!item) {
    res.status(404).send('Item not found');
    return;
  }
  res.render('details', { item });
});

// Start the server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

