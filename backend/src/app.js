const express = require('express');

const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

const config = require('./config');

const makeServices = require('./services');
const makeControllers = require('./controllers');
const { HttpException, NotFoundException } = require('./exceptions');

const services = makeServices();
const controllers = makeControllers(services);

const app = express();

app.use(morgan('short'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(helmet());
app.use(cors());

app.use(controllers);
app.get('/health', (request, response) => response.sendStatus(200));

app.use((req, res, next) => {
  throw new NotFoundException('Page Not Found!');
});

app.use((err, req, res, next) => {
  console.log(err);
  if (res.headersSent) {
    return next(err);
  }
  if (err instanceof HttpException) {
    res.status(err.status);
    res.json({ status: 'error', error: err.message });
    return next();
  }
  res.status(500);
  res.json({ status: 'error', error: err });
});

module.exports = app;
