require('dotenv').config()
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
const passport = require('passport');
var cors = require('cors');

require('./passport');

var indexRouter = require('./routes/index');
var postsRouter = require('./routes/posts');
var auth = require('./routes/auth')

const mongoose = require("mongoose");
const hbs = require('hbs');
const mongoDb = "mongodb+srv://" + process.env.DB_USER + ":" + 
	process.env.DB_PASS + "@" + process.env.DB_HOST + "/" + process.env.DB_TABLE
	 + "?retryWrites=true&w=majority";
mongoose.connect(mongoDb, { useNewUrlParser: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "mongo connection error"));

var app = express();
var whitelist = ['http://localhost:5000', 'http://kapsmo-website.herokuapp.com', 'https://kapsmo-website.herokuapp.com']
const corsOptions = {
    origin: function (origin, callback) {
      if (whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true
}
app.use(cors(corsOptions))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/auth', auth);
app.use('/posts', postsRouter);
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
