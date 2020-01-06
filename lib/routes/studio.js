const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
// .post('/', (req, res, next) => {
//   Studio
//     .create(req.body)
//     .then(studio => res.send(studio))
//     .catch(next);
// })

  .get('/studios', (req, res, next) => {
    Studio
      .find()
      .then(studio => res.send(studio))
      .catch(next);

    // [{ _id, name }]
  })

  .get('/studios/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .then(studio => res.send(studio))
      .catch(next);

    // { _id, name, address, films: [{ _id, title }] }

  });

// .patch('/:id', (req, res, next) => {
//   // const { id } = req.params
//   Studio
//     .findByIdAndUpdate(req.params.id, req.body, { new: true })
//     .then(note => res.send(note))
//     .catch(next);
// })

// .delete ('/:id', (req, res, next) => {
//   Studio
//     .findByIdAndDelete(req.params.id)
//     .then(note => res.send(note))
//     .catch(next);
// });

