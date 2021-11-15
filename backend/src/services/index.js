const makeProductsService = require('./products.service');
const makeUsersService = require('./users.service');
const {
  moveFile,
  removeFile,
  randomAlphabeticString,
  getFileExtension,
  joinPath,
  hashPassword,
  comparePassword,
} = require('../utils');

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

  return {
    productsService,
    usersService,
  };
}

module.exports = makeServices;
