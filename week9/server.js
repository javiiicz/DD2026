// Setup a node app: npm init -y
// Install express: npm i express
// Get code from expressjs.com

const express = require('express')
const app = express()
const port = 3001

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
}, {
    virtuals: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
destinationSchema.virtual("activities", {
    ref: "activities",
    localField: "_id",
    foreignField: "destination"
})

const activitySchema = new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    cost: Number,
    destination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "destinations"
    }
})

const pageSchema = new mongoose.Schema({
    slug: String,
    name: String,
    description: String
})

const gallerySchema = new mongoose.Schema({
    name: String,
    description: String,
})
gallerySchema.virtual('images', {
    ref: "images",
    localField: "_id",
    foreignField: "gallery"
})

const imgSchema = new mongoose.Schema({
    url: String,
    caption: String,
    gallery: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "galleries"
    }
})

const Destination = mongoose.model("destinations", destinationSchema);
const Activity = mongoose.model("activities", activitySchema);
const Page = mongoose.model("pages", pageSchema);
const Gallery = mongoose.model("galleries", gallerySchema);
const Image = mongoose.model("images", imgSchema);

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/travelsite');}
main().catch(err => console.log(err));


app.use(express.static(path.join(__dirname, 'static')));
app.use(express.urlencoded({ extended: true }))


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    // Handle Preflight
    if (req.method === 'OPTIONS') {
        return res.sendStatus(204);
    }
    next();
});

app.get("/", async (req, res) => {
  const homePage = await Page.findOne({ slug: "home" }).lean();
  const gallery = await Gallery.findOne({ name: "home" })
    .populate("images")
    .lean();

  const destinations = await Destination.find().lean();
  res.render("home", {
    title: homePage.name,
    description: homePage.description,
    galleryImages: gallery.images,
    destinations: destinations,
  });
});

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
    res.render("destinations", { destinations, title: "Destinations" })
})

app.get("/destinations/:id", async (req, res) => {
    let destinationId = req.params.id;
    const destination = await Destination.findById(destinationId).populate('activities').lean();
    //const activities = await Activity.find({ destination: destinationId }).lean();
    
    res.render("details", { 
        title: destination.name, 
        destination: destination, 
        activities: destination.activities 
    })
});

app.post("/pages", async (req, res) => {
    const { slug, name, destination } = req.body
    const newPage = new Page({
        slug, name, destination
    })
    await newPage.save();
    res.send("New Page Saved Successfully");
})

app.post("/galleries", async (req, res) => {
    const { name, description } = req.body
    const newGallery = new Gallery({
        name, description 
    })
    await newGallery.save();
    res.send("New Gallery Saved Successfully");
})

app.post("/images", async (req, res) => {
    const { url, caption, gallery } = req.body
    const newImage = new Image({
        url, caption, gallery
    })
    await newImage.save();
    res.send("New Image Saved Successfully");
})

app.get('/api/destinations', async (req, res) => {
    const destinations = await Destination.find().lean();
    res.json(destinations)
})


app.listen(port, () => {
    console.log(`Example app listening on port http://localhost:${port}`)
})

