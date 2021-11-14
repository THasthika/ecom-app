const makeProductsService = require('./products.service');
const {
  moveFile,
  removeFile,
  randomAlphabeticString,
  getFileExtension,
  joinPath,
} = require('../utils');

function makeServices() {
  const productsService = makeProductsService({
    moveFile,
    removeFile,
    randomAlphabeticString,
    getFileExtension,
    joinPath,
  });

  return {
    productsService,
  };
}

module.exports = makeServices;
