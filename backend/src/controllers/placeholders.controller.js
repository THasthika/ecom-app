const express = require('express');
const { body, param, query } = require('express-validator');
const { controllerWrapper } = require('../utils');
const validatorMiddleware = require('../middlewares/validator.middleware');
const { upload } = require('../utils/multerHelper');
const { BadRequest } = require('http-errors');
const path = require('path');

function makePlaceholdersController({}) {
  const router = express.Router();

  router.get('/product', (req, res) => {
    res.sendFile(path.resolve('./data/placeholders/product.png'));
  });

  return router;
}

module.exports = makePlaceholdersController;
