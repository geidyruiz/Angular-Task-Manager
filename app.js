var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./server/controllers/index');
var usersRouter = require('./server/controllers/users');
var tasksController = require('./server/controllers/tasks');


var app = express();


//DataBase Connection - try to connect an log a pass/fail result!

const mongoose = require('mongoose')
const globals = require('./config/globals')
mongoose.connect(globals.db,

//mongoose.connect('mongodb+srv://GeidyRuiz:123@clustermanager.1eeyb.mongodb.net/tasks',

    {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }).then(
    (res) =>
    {
      console.log('Connection to MongoDB')
    }).catch(() =>
{
  console.log('Connection Error')
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//URL TASKS
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/tasks',tasksController);

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
  res.render('error');
});

module.exports = app;
