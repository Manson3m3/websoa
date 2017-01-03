var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//******************************************
var index = require('./routes/index');
var users = require('./routes/users');

//请所有成员在此处添加require*****************************************
//zengyifan************************************************************
var homePlay = require('./routes/homePlay');
var ranklist = require('./APIs/ranklist');
var recommendlist = require('./APIs/recommendlist');
var songinfo = require('./APIs/songinfo');
var comment = require('./APIs/comment');
var addcomment = require('./APIs/addcomment');
/**********************************************************************/
//houli's
var session = require('express-session')
var login = require('./routes/login');
var reg = require('./routes/reg');
//var modifyPw = require('./routes/modifyPw');
var selfpage = require('./routes/selfpage');

/***********************************************************************/

//********************************************************************
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//路径
app.use('/', index);
app.use('/users', users);
//请所有成员在此处添加路径====================================
//houli's*****************************************************
app.use(session({
  secret:'an',
  resave:false,
  saveUninitialized:true,
}))
app.use(login);
app.use(reg);
//app.use(modifyPw);
app.use(selfpage);
//************************************************************
//zengyifan***************************************************
app.use(homePlay);
app.use('/api', ranklist);
app.use('/api', recommendlist);
app.use('/api', songinfo);
app.use('/api', comment);
app.use('/api', addcomment);
//============================================================

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
