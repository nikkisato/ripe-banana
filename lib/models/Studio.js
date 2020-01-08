const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: {
    type: String,
    required:true
  },
  address: {
    city: String,
    state: String,
    country: String,
  }
},
{ 
  id: false,
  toJSON: { virtuals: true }
});
  
schema.virtual('films', {
  ref: 'Film',
  localField: '_id',
  foreignField: 'studio',
  options: {
    limit: 5
  }
});


module.exports = mongoose.model('Studio', schema);

