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

const activitySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    cost: Number,
    destination: { type: mongoose.Schema.Types.ObjectId, ref: "destinations" }
})

const Destination = mongoose.model("destinations", destinationSchema);
const Activity = mongoose.model("activities", activitySchema);

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
    const newDestination = new Destination({
        page, name, description, image
    })
    await newDestination.save();
    res.send("New Destination Saved Successfully");
})

app.post("/activities", async (req, res) => {
    // console.log(req.body)
    const { name, description, image, cost, destination } = req.body
    const newActivity = new Activity({
        name, description, image, cost, destination
    })
    await newActivity.save();
    res.send("New Activity Saved Successfully");
})

app.get("/destinations", async (req, res) => {
    const destinations = await Destination.find().lean();
    // console.log(destinations);
    res.render("destinations", {destinations, title: "Destinations"})
})

app.get("/destinations/:id", async (req, res) => {
    let destinationId = req.params.id;
    const destination = await Destination.findById(destinationId).lean();
    const activities = await Activity.find({destination: destinationId}).lean();
    res.render("details", {title: destination.name, destination: destination, activities: activities})
});

app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

