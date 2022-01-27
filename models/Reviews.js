const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ReviewsSchema = new Schema({
    title: String,
    description: String,
    email: String,
    reviewPosted: {
        type: Date,
        default: new Date()
    }
})

const Reviews = mongoose.model('Reviews', ReviewsSchema);
module.exports = Reviews;