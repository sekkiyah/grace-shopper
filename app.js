const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const router = require('./api');

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api', router);

module.exports = app;