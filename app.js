var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sessions = require('./utils/session_manager');
var indexRouter = require('./routes/index');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

function getSessionCookie(req, i = 0) {
  var cookie = req.headers.cookie;
  // user=someone; session=mySessionID
  
  let arr = cookie.split('; ');
  return arr[i].split('=')[1]
}
const checkLogin = function (req, res, next) {
  console.log(req.headers)
  console.log(req.originalUrl)
  if(req.originalUrl != '/' && req.originalUrl != '/login'){
      let ses_cookie = getSessionCookie(req);
      if(!sessions.isAvailable(ses_cookie)){
        return res.redirect('/')
      }
  }
  next()
}
app.use(checkLogin)

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = err;

  // render the error page
  res.status(err.status || 500);
  res.send( err.message);
});

app.listen(8082, function () {
  console.log('listeninng on 8082...');
});

module.exports = app;
