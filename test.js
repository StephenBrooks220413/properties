const Products = require('./models/Products');
const mongoose = require('mongoose');

require('dotenv').config()

// DB Connection
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})
if(!mongoose){
    console.log('Error connecting to DB.')
} else {
    console.log('DB Connected!!!!!');
}

Products.create({
    title: "clothes",
    price: "$39",
    sizes: "sm, m, lg, xl",
    contact: "krammer439298@gmail.com",
}, (error, products)=>{
    console.log(error, products)
})