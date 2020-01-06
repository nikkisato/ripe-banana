const { Router } = require('express');
const Actor = require('../models/Actor');

module.exports = Router()
  .get('/actors', (req, res, next) => {
    Actor
      .find()
      .then(actor => res.send(actor))
      .catch(next);

    // [{ _id, name }]
  })

  .get('/actors/:id', (req, res, next) => {
    Actor
      .findById(req.params.id)
      .then(actor => res.send(actor))
      .catch(next);

    //   {
    //     name,
    //     dob,
    //     pob,
    //     films: [{
    //       id,
    //       title,
    //       released
    //     }]
    // }

  });
