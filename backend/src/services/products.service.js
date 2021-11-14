const { Product, ProductImage, sequelize } = require('../models');

const { Op } = require('sequelize');
const { InternalServerException } = require('../exceptions');
const {
  ProductImageCountWillExceeded,
  ProductNotFoundException,
} = require('../exceptions/products.exceptions');
const config = require('../config');

const productImagePrefix = 'product_';
const productImageMax = 5;

function makeProductsService({
  moveFile,
  removeFile,
  randomAlphabeticString,
  getFileExtension,
  joinPath,
}) {
  function getProductImagePath(name, ext) {
    return joinPath(
      config.APP_ROOT,
      config.APP_IMAGE_DIR,
      `${productImagePrefix}${name}.${ext}`,
    );
  }

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
      return await Product.findOne({ where: { id: id } });
    } else if (rows == 0) {
      throw new ProductNotFoundException();
    } else {
      throw new InternalServerException();
    }
  }

  async function deleteProduct(id) {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new ProductNotFoundException();
    }
    const rows = await Product.destroy({
      where: {
        id: id,
      },
    });
    if (rows == 1) {
      return product;
    } else if (rows == 0) {
      throw new ProductNotFoundException();
    } else {
      throw new InternalServerException();
    }
  }

  async function getProductById(id) {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new ProductNotFoundException();
    }
    return product;
  }

  async function getAllProducts() {
    return await Product.findAll();
  }

  async function queryProducts(
    dto = {
      q,
      minPrice,
      maxPrice,
      minQuantity,
      sortBy,
      sortDir,
      limit,
      offset,
    },
  ) {
    const where = {};

    if (!!dto.q) {
      // make q object
      const qObj = {
        [Op.iLike]: `%${dto.q}%`,
      };
      where.title = qObj;
      where.description = qObj;
    }

    const wherePrice = {};

    if (!!dto.minPrice) {
      wherePrice[Op.gte] = dto.minPrice;
      where.price = wherePrice;
    }
    if (!!dto.maxPrice) {
      wherePrice[Op.lte] = dto.maxPrice;
      where.price = wherePrice;
    }
    if (!!dto.minQuantity) {
      where.quantity = {
        [Op.gte]: dto.minQuantity,
      };
    }

    let order = null;
    if (!!dto.sortBy) {
      order = [[dto.sortBy, dto.sortDir || 'ASC']];
    }

    // limits
    const limit = dto.limit || 10;
    const offset = dto.offset || 0;

    return await Product.findAll({
      where: where,
      limit: limit,
      offset: offset,
      order: order,
    });
  }

  async function addImagesToProduct(
    id,
    dto = Array({ srcPath, size, originalName, mimetype }),
  ) {
    const product = await Product.findOne({ where: { id: id } });
    if (!product) {
      throw new ProductNotFoundException();
    }

    const count = await ProductImage.count({
      where: { productId: id },
    });
    if (count + dto.length > productImageMax) {
      throw new ProductImageCountWillExceeded();
    }

    // get next rank
    let nextRank =
      ((await ProductImage.max('rank', {
        where: { productId: id },
      })) || 0) + 1;

    // add database entires
    const productImages = [];
    const filesToMove = [];
    await sequelize.transaction(async (t) => {
      for (let i = 0; i < dto.length; i++) {
        const name = randomAlphabeticString(40);
        const ext = getFileExtension(dto[i].originalName);
        const productImage = await ProductImage.create(
          {
            productId: id,
            name: name,
            extension: ext,
            rank: nextRank++,
          },
          { transaction: t },
        );
        filesToMove.push({
          src: dto[i].srcPath,
          dest: getProductImagePath(name, ext),
        });
        productImages.push(productImage);
      }
    });

    await Promise.all(
      filesToMove.map((v) => {
        return moveFile(v.src, v.dest);
      }),
    );

    return productImages;
  }

  async function getProductImages(id) {
    const product = await Product.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
    const productImages = await ProductImage.findAll({
      where: {
        productId: product.id,
      },
      order: [['rank', 'ASC']],
    });

    return productImages;
  }

  async function getProductImagePath(id, name) {
    const product = await Product.findOne({
      where: { id: id },
    });
    if (!product) {
      throw new ProductNotFoundException();
    }
  }

  return {
    createProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getAllProducts,
    queryProducts,
    addImagesToProduct,
    getProductImages,
  };
}

module.exports = makeProductsService;
