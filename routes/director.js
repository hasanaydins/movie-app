var express = require('express');
var router = express.Router();

const Director = require('../models/Director');

/* GET directors page. */
router.get('/', function(req, res, next) {
  const promise = Director.find({});
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  });
});

/* GET directors page. */
router.post('/', function(req, res, next) {
  const director = new Director(req.body);

  const promise = director.save();
  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })

});

module.exports = router;
