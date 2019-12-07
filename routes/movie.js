var express = require('express');
var router = express.Router();

// Models
const Movie = require('../models/Movie');

//get all movies
router.get('/', function (req, res) {
 const promise = Movie.find({});
 promise.then((data) => {
   res.json(data);
 }).catch((err) => {
   res.json(err);
 });
});

//get top10 movie
router.get('/top10', (req,res, next) => {
  const promise = Movie.find({}).limit(10).sort({ imdb_score: -1 }); // 1 kucukten buyuge, -1 buyukten kucuge

  promise.then((movie) => {
    if(!movie){
      next({  message: 'film bulunamadi..', code:99  });
    }


    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//get one movie
router.get('/:movie_id', (req,res, next) => {
  const promise = Movie.findById(req.params.movie_id);

  promise.then((movie) => {
    if(!movie){
      next({  message: 'film bulunamadi..', code:99  });
    }


    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});



//put a movie
router.put('/:movie_id', (req,res, next) => {
  const promise = Movie.findByIdAndUpdate(req.params.movie_id, req.body, {new: true});

  promise.then((movie) => {
    if(!movie){
      next({  message: 'film bulunamadi..', code:99  });
    }

    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

//delete one movie
router.delete('/:movie_id', (req,res, next) => {
  const promise = Movie.findByIdAndRemove(req.params.movie_id);

  promise.then((movie) => {
    if(!movie){
      next({  message: 'film bulunamadi..', code:99  });
    }


    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});

// post a movie
router.post('/', function(req, res, next) {
  // const {title, imdb_score, category, country, year} = req.body;

  const movie = new Movie(req.body);

  // movie.save((err, data) => {
  //   if(err)
  //     res.json(err);
  //
  //   res.json(data);
  // });

  const promise = movie.save();
  promise.then( (data) => {
    res.send(data);
  }).catch((err) => {
    res.json(err);
  })

});

//between two year
router.get('/between/:start_year/:end_year', (req,res, next) => {
  const {start_year, end_year} = req.params;

  const promise = Movie.find({

    year:{ $gte: parseInt(start_year), $lte: parseInt(end_year) }
  });

  promise.then((movie) => {
    if(!movie){
      next({  message: 'film bulunamadi..', code:99  });
    }


    res.json(movie);
  }).catch((err) => {
    res.json(err);
  });
});




module.exports = router;
