const express = require('express');
const makeProductsController = require('./products.controller');
const makeUsersController = require('./users.controller');

function makeControllers(services) {
  const router = express.Router();

  const productsController = makeProductsController({
    productsService: services.productsService,
  });
  router.use('/products', productsController);

  const usersController = makeUsersController({
    usersService: services.usersService,
  });
  router.use('/users', usersController);

  return router;
}

module.exports = makeControllers;
