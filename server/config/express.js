const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const cors = require('cors');

let indexController = require('../controllers/index');

const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


module.exports = app;