const makeProductsService = require('./products.service');

function makeServices() {
  const productsService = makeProductsService({});

  return {
    productsService,
  };
}

module.exports = makeServices;
