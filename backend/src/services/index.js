const makeProductsService = require('./products.service');
const makeUsersService = require('./users.service');
const makeAuthService = require('./auth.service');
const makeOrdersService = require('./orders.service');
const {
  moveFile,
  removeFile,
  randomAlphabeticString,
  getFileExtension,
  joinPath,
} = require('../utils');

const {
  hashPassword,
  comparePassword,
  createAccessToken,
  checkAccessToken,
} = require('../utils/auth');

function makeServices() {
  const productsService = makeProductsService({
    moveFile,
    removeFile,
    randomAlphabeticString,
    getFileExtension,
    joinPath,
  });

  const usersService = makeUsersService({
    hashPassword,
    comparePassword,
  });

  const authService = makeAuthService({
    comparePassword,
    checkAccessToken,
    createAccessToken,
  });

  const ordersService = makeOrdersService({});

  return {
    productsService,
    usersService,
    authService,
    ordersService,
  };
}

module.exports = makeServices;
