const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  dob: Date,
  pob: String,
},
{ 
  id: false,
  toJSON: { virtuals: true }
});

schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'cast.actor',
  options: {
    limit: 5
  }
});

module.exports = mongoose.model('Actor', schema);
