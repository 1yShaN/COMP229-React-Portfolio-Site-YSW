const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

const app = express();

let indexRouter = require('../app/routers/index');
let projectsRouter = require('../app/routers/projects');
let referencesRouter = require('../app/routers/references');
let servicesRouter = require('../app/routers/services');
let usersRouter = require('../app/routers/users');

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', indexRouter);
app.use('/api/projects', projectsRouter);
app.use('/api/references', referencesRouter);
app.use('/api/services', servicesRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // render the error json
    res.status(err.status || 500);
    res.json(
        {
            success: false,
            message: err.message
        }
    );
});

module.exports = app;