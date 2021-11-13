const express = require('express');
const { body, param } = require('express-validator');
const { controllerWrapper } = require('../utils');
const validatorMiddleware = require('../middlewares/validator.middleware');

function makeProductsController({ productsService }) {
  const router = express.Router();

  router.post(
    '/',
    body('title').notEmpty(),
    body('description').notEmpty(),
    body('price').notEmpty().isInt(),
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
    body('price').notEmpty().isInt().optional(),
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

  return router;
}

module.exports = makeProductsController;
