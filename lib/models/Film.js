const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
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
    actor:  {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Actor',
      required: true
    }
  }]
},
{ 
  id: false,
  toJSON: { virtuals: true }
});

  
schema.virtual('review', {
  ref: 'Review',
  localField: '_id',
  foreignField: 'film',
  options: {
    limit: 5
  }
});


module.exports = mongoose.model('Film', schema);

