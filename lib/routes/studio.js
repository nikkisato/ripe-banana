const { Router } = require('express');
const Studio = require('../models/Studio');

module.exports = Router()
  .post('/', (req, res, next) => {
    Studio
      .create(req.body)
      .then(studio => res.send(studio))
      .catch(next);
  })

  .get('/', (req, res, next) => {
    Studio
      .find()
      .select({ address: false })
      .then(studio => res.send(studio))
      .catch(next);

  })

  .get('/:id', (req, res, next) => {
    Studio
      .findById(req.params.id)
      .populate('film', {
        title: true
      }).lean()
      .then(studio => res.send(studio))
      .catch(next);

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

