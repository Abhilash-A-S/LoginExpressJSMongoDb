const path = require('path');
const logger = require('morgan');
const express = require('express');
const passport = require('passport');
const PORT = process.env.PORT || 9001;
const flash = require('connect-flash');
const session = require('express-session');
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const routerHandler = require('./routes/routerhandler');
const mongoConfig = require('./mongodb/mongo.config');
const serviceHandler = require('./services/servicehandler')
const app = express();

const connectMongoDb = async () => {
  const connectionStatus = await mongoConfig.connectToServer();
  console.log(connectionStatus);
}
connectMongoDb();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(session({
  secret: 'need_to_implement',
  resave: false,
  saveUninitialized: false
}))

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());



app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname)));



app.use('/', routerHandler);
app.use('/', serviceHandler);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(PORT, () => {
  console.log(`Server app is running http://localhost:${PORT}/`);
});