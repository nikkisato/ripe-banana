const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .post('/api/v1/actors', (req, res, next) => {
    Actor
      .create(req.body)
      .then(actor => res.send(actor))
      .catch(next);
  })
  .get('/api/v1/actors', (req, res, next) => {
    Actor
      .find()
      .select({ dob: false, pob: false })
      .then(actors => res.send(actors))
      .catch(next);
  })

  .get('/api/v1/actors/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .populate('films', { title: true, released: true })
      .then(actor => res.send(actor))
      .catch(next);
  });
