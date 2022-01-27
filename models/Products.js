const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
    title: String,
    description: String,
    image: String,
    price: String,
    sizes: String,
    contact: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
})

const Product = mongoose.model('Product', ProductSchema);
module.exports = Product