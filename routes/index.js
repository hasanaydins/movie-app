var express = require('express');
var router = express.Router();

var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken')
// Models
const User = require('../models/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'hel' });
});

/* GET home page. */
router.post('/register', function(req, res, next) {
  const {username, password} = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(password, salt, function(err, hash) {
            const user = new User({username, password: hash}); //username yukardan gelen password haslenen olacak

            const promise = user.save();
            promise.then((data) => {
                res.json(data);
            }).catch((err) => {
                res.json(err);
            });
        });
    });

});

//login islemi
router.post('/authenticate', (req, res) => {
    const {username, password} = req.body;

    User.findOne({
        username,

    }, (err, user) => {
       if (err)
           throw err;

       if (!user)
           res.json({
               status: false,
               message: 'kullanıcı yok'
           });
       else {
           bcrypt.compare(password, user.password).then((result) => { //sifre karsılastır dogruysa token olustur
               if (!result) {
                   res.json({
                       message: 'yanlis parola',
                       status: false
                   })
               }
               else {
                   const payload = {
                        username
                   };
                   const token = jwt.sign(payload, req.app.get('api_secret_key'), {
                       expiresIn: 720 //12 saat
                   });
                   res.json({
                       status: true,
                       token
                   })
               }
           });
       }
    });
})
module.exports = router;
