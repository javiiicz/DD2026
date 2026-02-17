const hbs = require('express-handlebars')

// Setup a node app: npm init -y
// Install express: npm i express
// Get code from expressjs.com

const express = require('express')
const app = express()
const port = 3000

app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const path = require('path');

app.use(express.static(path.join(__dirname, 'static')));


//data
const directory = require("./data/directory.json");


app.get("/home", (req, res) => {
    res.render("home", {title: "Home page..."})
})

app.get('/', (req, res) => {
    let filePath = path.join(__dirname, 'static', 'homepage.html')
    res.sendFile(filePath)
    // res.send('Hello World!')
})

app.get('/about', (req, res) => {
    let filePath = path.join(__dirname, 'static', 'about.html')
    res.sendFile(filePath)
    // res.send('Hello World!')
})

// HTTP METHODS GET POST PUT DELETE
//GET
app.get("/api/items", (req, res) => {
res.send("this is a get response from /api/items");
});
//POST
app.post("/api/items", (req, res) => {
res.send("this is a post response from /api/items");
});
//PUT
app.put("/api/items/:id", (req, res) => {
res.send(`this is a put response from /api/items/`);
});
//DELETE
app.delete("/api/items/:id", (req, res) => {
res.send(`this is a delete response from /api/items/`);
});


app.get('/directory', (req,res) => {
    res.render('directory', {directory})
})
app.get('/directory/:id', (req,res) => {
    // TODO : user pages
    res.render('directory', {directory})
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

