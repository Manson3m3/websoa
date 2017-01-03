var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var ejs = require('ejs')
var index = require('./routes/index');
var users = require('./routes/users');
global.user_id="1";
global.user_name = "initName";
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
var register = require('./routes/register');
var selfpage = require('./routes/selfpage');
/***********************************************************************/
/***********************************************************************/
//yzc's
var search = require('./routes/search');
var restfulAPI = require('./routes/restfulAPI');
/***********************************************************************/
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.engine('.ejs',ejs.__express);
app.set('view engine', 'ejs');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));



app.use('/', index);
app.use('/users', users);
/***************************************************/

//houli's
app.use(session({
  secret:'an',
  resave:false,
  saveUninitialized:true,
}))
app.use(login);
app.use(register);
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
//yzc's
app.use(search);
app.use(restfulAPI);

/*app.get('/',function(req,res){
  res.render('index');
})*/
/****************************************************/
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
//module.exports = router;
