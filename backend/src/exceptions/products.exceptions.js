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
  constructor(max = 5) {
    super(`Maximum Allowed Image Count is ${max}`);
  }
}

module.exports = {
  ProductNotFoundException,
  ProductImageNotFoundException,
  ProductImageCountWillExceeded,
};
