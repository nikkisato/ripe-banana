const mongoose = require('mongoose');


const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  // studio: <studio _id RI>,
  studio: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Studio',
    required: true
  },
  released: {
    type: Number,
    required: true
  },
  cast: [{
    role: String,
    //   actor: <actor _id RI>
    actor:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
});


module.exports = mongoose.model('Film', schema);

