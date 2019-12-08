var mongoose = require('mongoose');
var express = require('express');
var router = express.Router();

const Director = require('../models/Director');

// /* GET directors page. */
// router.get('/', function(req, res, next) {
//   const promise = Director.find({});
//   promise.then((data) => {
//     res.json(data);
//   }).catch((err) => {
//     res.json(err);
//   });
// });

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
// tek bir yonetmen getir
router.get('/:director_id', (req, res) => {
  const promise = Director.aggregate([
    { // getalldan tek farkı match yapması
      $match: {
        '_id': mongoose.Types.ObjectId(req.params.director_id)
      }
    },
    { // movies ve directors tablosunu join etme aynı yonetmenşn flmleri
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies' // nereye kaydedlsin yeni lliste
      }
    },
    { //yeni tabloya yazdır
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true // eslesen olmasa da getir
      }
    }, //aynı yonetmen ise grupla
    {
      $group: {
        _id: {
          _id: '$_id',
          name: '$name',
          surname: '$surname',
          bio: '$bio'
        },
        movies: {
          $push: '$movies' //pathdeki data
        }
      }
    },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
      }}
  ]);

  promise.then((data) => {
    res.json(data);
  }).catch((err) => {
    res.json(err);
  })
});

// tum yonetmenleri getir
router.get('/', (req, res) => {
  const promise = Director.aggregate([
    { // movies ve directors tablosunu join etme aynı yonetmenşn flmleri
      $lookup: {
        from: 'movies',
        localField: '_id',
        foreignField: 'director_id',
        as: 'movies' // nereye kaydedlsin yeni lliste
      }
    },
    { //yeni tabloya yazdır
      $unwind: {
        path: '$movies',
        preserveNullAndEmptyArrays: true // eslesen olmasa da getir
      }
    }, //aynı yonetmen ise grupla
      {
        $group: {
          _id: {
            _id: '$_id',
            name: '$name',
            surname: '$surname',
            bio: '$bio'
          },
          movies: {
            $push: '$movies' //pathdeki data
          }
        }
      },
    {
      $project: {
        _id: '$_id._id',
        name: '$_id.name',
        surname: '$_id.surname',
        movies: '$movies'
  }}
  ]);

    promise.then((data) => {
      res.json(data);
    }).catch((err) => {
      res.json(err);
    })
});

//put a director
router.put('/:director_id', (req,res, next) => {
  const promise = Director.findByIdAndUpdate(req.params.director_id, req.body, {new: true});

  promise.then((director) => {
    if(!director){
      next({  message: 'director bulunamadi..', code:99  });
    }

    res.json(director);
  }).catch((err) => {
    res.json(err);
  });
});

//delete one director
router.delete('/:director_id', (req,res, next) => {
  const promise = Director.findByIdAndRemove(req.params.director_id);

  promise.then((director) => {
    if(!director){
      next({  message: 'director bulunamadi..', code:99  });
    }


    res.json( { message: 'deleted'  });
  }).catch((err) => {
    res.json(err);
  });
});

module.exports = router;
