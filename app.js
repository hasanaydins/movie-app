var createError = require('http-errors');
var express = require('express');
var path = require('path');
var nunjucks = require('nunjucks');
var cookieParser = require('cookie-parser');
var lessMiddleware = require('less-middleware');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var movie = require('./routes/movie');

var app = express();

//db connectionn
const db = require('./helper/db')();

// view engine setup
app.set("view engine", "njk"); // uzantı eklemek icin nodemon app.js -e js,html,njk,css
nunjucks.configure('views', {
  express: app
});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(lessMiddleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/movies', movie);

// catch 404 and forward to error.njk handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error.njk handler
app.use(function(err, req, res, next) {
  // set locals, only providing error.njk in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error.njk page
  res.status(err.status || 500);
  res.json({  error: { message: err.message, code: err.code }  });
});

module.exports = app;
