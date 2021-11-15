const express = require('express');
const makeProductsController = require('./products.controller');
const makeUsersController = require('./users.controller');
const makeAuthController = require('./auth.controller');

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

  const authController = makeAuthController({
    authService: services.authService,
  });
  router.use('/auth', authController);

  return router;
}

module.exports = makeControllers;
