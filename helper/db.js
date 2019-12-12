const mongoose = require('mongoose');

module.exports = () => {
  mongoose.connect('mongodb://movie-app:hasan3447@ds253348.mlab.com:53348/heroku_2n0sxfqm',{ useNewUrlParser: true, useUnifiedTopology: true });

  mongoose.connection.on('open', () => {
   // console.log('mongodb connected');
  });

  mongoose.connection.on('error', (err) => {
    console.log('mongodb error', err);
  });


  mongoose.Promise = global.Promise;
};