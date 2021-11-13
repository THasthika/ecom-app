const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const config = require('./config');

const app = express();
const api = require('./api');

app.get('/', (request, response) => response.sendStatus(200));
app.get('/health', (request, response) => response.sendStatus(200));

app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(api);

module.exports = app;
