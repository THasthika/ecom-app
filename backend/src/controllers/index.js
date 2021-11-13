const express = require('express');
const makeProductsController = require('./products.controller');

function makeControllers(services) {
  const router = express.Router();

  const productsController = makeProductsController({
    productsService: services.productsService,
  });
  router.use('/products', productsController);

  return router;
}

module.exports = makeControllers;
