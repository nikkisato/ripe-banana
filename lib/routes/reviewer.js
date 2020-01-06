const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .get('/reviewer', (req, res, next) => {
    Reviewer
      .find()
      .then(reviewer => res.send(reviewer))
      .catch(next);

    //   [{
    //     _id,
    //     name,
    //     company
    //   }]  })
  })
  .get('/reviewer/:id', (req, res, next) => {
    Reviewer
      .findById(req.params.id)
      .then(reviewer => res.send(reviewer))
      .catch(next);

    //   {
    //     _id,
    //     name,
    //     company,
    //     reviews: [{
    //         _id,
    //         rating,
    //         review,
    //         film: { _id, title }
    //     }]
    // }
  });

