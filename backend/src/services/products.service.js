const Product = require('../models').Product;
const {
  HttpException,
  InternalServerException,
  NotFoundException,
} = require('../utils/exceptions');

function makeProductsService({}) {
  function createProduct(
    dto = { title, description, price, quantity },
  ) {
    return Product.create(dto);
  }

  async function updateProduct(
    id,
    dto = { title, description, price, quantity },
  ) {
    const updateObject = {};
    if (!!dto.title) {
      updateObject.title = dto.title;
    }
    if (!!dto.description) {
      updateObject.description = dto.description;
    }
    if (!!dto.price) {
      updateObject.price = dto.price;
    }
    if (!!dto.quantity) {
      updateObject.quantity = dto.quantity;
    }
    const rows = await Product.update(updateObject, {
      where: {
        id: id,
      },
    });

    if (rows == 1) {
      const product = await Product.findOne({ where: { id: id } });
      return product;
    } else if (rows == 0) {
      throw new NotFoundException('Product Not Found');
    } else {
      throw new InternalServerException();
    }
  }

  async function deleteProduct(id) {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    const rows = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (rows == 1) {
      return product;
    } else if (rows == 0) {
      throw new NotFoundException('Product Not Found');
    } else {
      throw new InternalServerException();
    }
  }

  async function getProductById(id) {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new NotFoundException('Product Not Found');
    }
    return product;
  }

  async function getAllProducts() {
    return await Product.findAll();
  }

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
  };
}

module.exports = makeProductsService;
