const express = require('express');
const { body, param, query } = require('express-validator');
const { controllerWrapper } = require('../utils');
const validatorMiddleware = require('../middlewares/validator.middleware');
const { upload } = require('../utils/multerHelper');
const { BadRequest } = require('http-errors');

function makeProductsController({ productsService }) {
  const router = express.Router();

  router.post(
    '/',
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty().isFloat(),
    body('quantity').notEmpty().isInt(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.createProduct({
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      });
    }),
  );

  router.patch(
    '/:id',
    param('id').isInt(),
    body('title').notEmpty().optional(),
    body('description').notEmpty().optional(),
    body('price').notEmpty().isFloat().optional(),
    body('quantity').notEmpty().isInt().optional(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.updateProduct(req.params.id, {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        quantity: req.body.quantity,
      });
    }),
  );

  router.delete(
    '/:id',
    param('id').isInt(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.deleteProduct(req.params.id);
    }),
  );

  router.get(
    '/query',
    query('q').isString().optional(),
    query('minPrice').isFloat().optional(),
    query('maxPrice').isFloat().optional(),
    query('minQuantity').isInt().optional(),
    query('sortBy')
      .isIn(['title', 'price', 'quantity', 'createdAt', 'updatedAt'])
      .optional(),
    query('sortDir').isIn(['ASC', 'DESC']).optional(),
    query('limit').isInt().optional(),
    query('offset').isInt().optional(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.queryProducts({
        q: req.query.q,
        minPrice: req.query.minPrice,
        maxPrice: req.query.maxPrice,
        minQuantity: req.query.minQuantity,
        sortBy: req.query.sortBy,
        sortDir: req.query.sortDir,
        limit: req.query.limit,
        offset: req.query.offset,
      });
    }),
  );

  router.get(
    '/:id',
    param('id').isInt(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.getProductById(req.params.id);
    }),
  );

  router.get(
    '/',
    controllerWrapper(async (req, res) => {
      return await productsService.getAllProducts();
    }),
  );

  router.post(
    '/:id/images',
    param('id').isInt(),
    validatorMiddleware,
    upload.array('images', 5, {
      limits: {
        fileSize: 1024 * 1024 * 1,
      },
      fileFilter: (req, file, cb) => {
        if (['jpeg', 'png'].includes(file.mimetype.replace('image/', '')))
          return cb(null, true);
        return cb(new BadRequest('invalid file type'), false);
      },
    }),
    controllerWrapper(async (req, res) => {
      const dto = req.files.map((v) => ({
        srcPath: v.path,
        mimetype: v.mimetype,
        size: v.size,
        originalName: v.originalname,
      }));
      return await productsService.addImagesToProduct(req.params.id, dto);
    }),
  );

  router.get(
    '/:id/images',
    param('id').isInt(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.getProductImages(req.params.id);
    }),
  );

  router.get(
    '/:id/images/:name',
    param('id').isInt(),
    param('name').notEmpty(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      const imagePath = await productsService.getProductImagePath(
        req.params.id,
        req.params.name,
      );
      return new Promise((resolve, reject) => {
        res.sendFile(imagePath, (err) => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    }),
  );

  router.delete(
    '/:id/images/:name',
    param('id').isInt(),
    param('name').notEmpty(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await productsService.removeProductImage(
        req.params.id,
        req.params.name,
      );
    }),
  );

  router.put(
    '/:id/images/:name',
    param('id').isInt(),
    param('name').notEmpty(),
    validatorMiddleware,
    upload.single('image', {
      limits: {
        fileSize: 1024 * 1024 * 1,
      },
      fileFilter: (req, file, cb) => {
        if (['jpeg', 'png'].includes(file.mimetype.replace('image/', '')))
          return cb(null, true);
        return cb(new BadRequest('invalid file type'), false);
      },
    }),
    controllerWrapper(async (req, res) => {
      return await productsService.replaceProductImage(
        req.params.id,
        req.params.name,
        {
          srcPath: req.file.path,
          mimetype: req.file.mimetype,
          size: req.file.size,
          originalName: req.file.originalname,
        },
      );
    }),
  );

  return router;
}

module.exports = makeProductsController;
