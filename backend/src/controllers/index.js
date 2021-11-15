const express = require('express');
const makeProductsController = require('./products.controller');
const makeUsersController = require('./users.controller');
const makeAuthController = require('./auth.controller');
const makePlaceholdersController = require('./placeholders.controller');

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

  const placeholdersController = makePlaceholdersController({});
  router.use('/placeholders', placeholdersController);

  return router;
}

module.exports = makeControllers;
