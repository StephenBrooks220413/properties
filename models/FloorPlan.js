const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FloorPlanSchema = new Schema({
    type: String,
    description: String,
    image: String,
    image2: String,
    size: String,
    availability: String,
    price: String,
    contact: String,
    datePosted: {
        type: Date,
        default: new Date()
    }
})

const FloorPlan = mongoose.model('FloorPlan', FloorPlanSchema);
module.exports = FloorPlan