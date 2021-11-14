const { NotFoundException, BadRequestException } = require('.');

class ProductNotFoundException extends NotFoundException {
  constructor() {
    super('Product Not Found');
  }
}

class ProductImageNotFoundException extends NotFoundException {
  constructor() {
    super('Product Image Not Found');
  }
}

class ProductImageCountWillExceeded extends BadRequestException {
  constructor() {
    super(`Maximum Allowed Image Count is ${productImageMax}`);
  }
}

module.exports = {
  ProductNotFoundException,
  ProductImageNotFoundException,
  ProductImageCountWillExceeded,
};
