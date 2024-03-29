const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const helloRouter = require('./routes/hello');
const indexRouter = require('./routes/index');
const registroRouter = require('./routes/registro');
const registro_usuarioRouter = require('./routes/registro_usuario');
const registro_trabajadorRouter = require('./routes/registro_trabajador');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Direcciones a las que se puede acceder desde la barra de url
app.use('/hello', helloRouter);

//Inicio
app.use('/', indexRouter);

//Registro
app.use('/registro', registroRouter);
app.use('/registro_usuario', registro_usuarioRouter);
app.use('/registro_trabajador', registro_trabajadorRouter);

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

module.exports = app;