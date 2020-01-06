const mongoose = require('mongoose');
const schema = new mongoose.Schema({
    rating: {
        Type:Number,
        required: true,
        min:1,
        max:5
    },
    reviewer: {

    },
    review: {
        type: String,
        required:true,
        max: 140
    },
    film: {
        type: ObjectId?
        // film: <film-id RI>
    }

  });

  module.exports = mongoose.model('Review', schema);
