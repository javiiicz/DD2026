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

// app.get('/images/mdp.jpg', (req, res) => {
//     let filePath = path.join(__dirname, 'static', 'images', 'mdp.jpg')
//     res.sendFile(filePath)
// })

// HTTP Methods
app.get('/api/items', (req,res) => {
    res.send("this is a GET response from /api/items")
})
app.post('/api/items', (req,res) => {
    res.send("this is a POST response from /api/items")
})
app.put('/api/items/:id', (req,res) => {
    res.send(`this is a PUT response from /api/items ${req.params.id}`)
})
app.delete('/api/items/:id', (req,res) => {
    res.send(`this is a DELETE response from /api/items ${req.params.id}`)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

