// Setup a node app: npm init -y
// Install express: npm i express
// Get code from expressjs.com

const express = require('express')
const app = express()
const port = 3000

const hbs = require('express-handlebars')

app.engine('handlebars', hbs.engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

const path = require('path');

// mongoose stuff
const mongoose = require('mongoose');
const { inflateRaw } = require('zlib');

const destinationSchema = new mongoose.Schema({
    page: String,
    name: String,
    description: String,
    image: String
});
const Destination = mongoose.model("destinations", destinationSchema);

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travelsite');

    // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
main().catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res) => {
    res.render('home', { title: "my travel site" })
})

app.post("/destinations", async (req, res) => {
    // console.log(req.body)
    const { page, name, description, image } = req.body
    const newDewstination = new Destination({
        page, name, description, image
    })
    await newDewstination.save();
    res.send("New Destination Saved Successfully");
})

app.get("/destinations", async (req, res) => {
    const destinations = await Destination.find().lean();
    // console.log(destinations);
    res.render("destinations", {destinations, title: "Destinations"})
})

app.get("/destinations/:id", async (req, res) => {
    let destinationId = req.params.id;
    const dest = await Destination.findById(destinationId).lean();
    res.render("details", {title: dest.name, destination: dest})
})

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

