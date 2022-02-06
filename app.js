var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var app = express();
var bodyparser=require('body-parser');
var multer =require('multer');
var upload= multer();
var session = require('express-session');
var cookieParser = require('cookie-parser');
var indexrouter=require('./routes/index');
var addrouter=require('./routes/add');

// view engine setup
app.use(logger('dev'));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');
app.use('/static',express.static('public'));
app.use(cookieParser());
app.use(session({secret: "Your secret key"}));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
app.use(upload.array());




  app.use('/',indexrouter);
  app.use('/',addrouter);
  

  app.use('/note',function(req,res,next){
    res.redirect('/log-in');
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  
});

module.exports = app;
