const express = require('express');
const app = new express();
const ejs = require('ejs');
const mongoose = require('mongoose');
const Products = require('./models/Products');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const Reviews = require('./models/Reviews');
const fileUpload = require('express-fileupload');
const path = require('path');
const FloorPlan = require('./models/FloorPlan');

require('dotenv').config();

// DB Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
if(!mongoose){
    console.log('Error connecting to DB.')
} else {
    console.log('DB Connected!!!!!');
}

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}));
app.use(fileUpload())
app.use(morgan());
app.set('view engine', 'ejs')
app.use(express.static('public'));

app.listen(process.env.PORT || 4000, () => {
    console.log('App listening')
})

app.get('/', async (req, res) => {
    const apartments = await FloorPlan.find({}).limit(1).sort({_id: -1})
    const products = await Products.find({}).limit(1).sort({_id: -1})
    const reviews = await Reviews.find({}).limit(1).sort({_id: -1})
    res.render('index', {
        products, apartments, reviews
    })
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/reviews/new', (req,res)=>{
    res.render('writeReview')
})

app.post('/review/store', async (req, res)=>{
    await Reviews.create(req.body)
    res.redirect('/')
})

app.get('/reviews', async (req, res)=>{
    const reviews = await Reviews.find({}).limit(30).sort({_id: -1})
    res.render('reviews', {
        reviews
    })
})

app.get('/products/new', (req, res)=>{
    res.render('newProduct')
})

app.post('/product/store', async (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/uploads', image.name), async (error) => {
        await Products.create({
            ...req.body,
            image: '/uploads/' + image.name
        })
        res.redirect('/')
    })
})

app.get('/products', async (req, res)=>{
    const products = await Products.find({}).limit(30).sort({_id: -1})
    res.render('products', {
        products
    })
})

app.get('/product/:id', async (req, res)=>{
    const product = await Products.findById(req.params.id)
    res.render('product', {
        product
    })
})

//////////////////////////////////////////////////////////
/////////// Apartments
app.get('/apartments/new', (req, res)=>{
    res.render('newApartment')
})

app.post('/apartment/store', async (req, res)=>{
    let image = req.files.image;
    image.mv(path.resolve(__dirname, 'public/uploads', image.name), async (error) => {
        await FloorPlan.create({
            ...req.body,
            image: '/uploads/' + image.name
        })
        res.redirect('/')
    })
})

app.get('/apartments', async (req, res)=>{
    const apartments = await FloorPlan.find({}).limit(30).sort({_id: -1})
    res.render('apartments', {
        apartments
    })
})

app.get('/apartment/:id', async (req, res)=>{
    const apartment = await FloorPlan.findById(req.params.id)
    res.render('apartment', {
        apartment
    })
})
