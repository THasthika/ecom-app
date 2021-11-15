const express = require('express');
const { body } = require('express-validator');
const {
  validAccessTokenOrRejectMiddleware,
  checkAccessTokenMiddleware,
} = require('../middlewares/auth.middleware');
const validatorMiddleware = require('../middlewares/validator.middleware');
const { controllerWrapper } = require('../utils');

function makeOrdersController({ ordersService }) {
  const router = express.Router();

  router.post(
    '/',
    body('products').isArray(),
    body('products.*.id').isInt(),
    body('products.*.amount').isInt(),
    validatorMiddleware,
    checkAccessTokenMiddleware,
    validAccessTokenOrRejectMiddleware,
    controllerWrapper(async (req, res) => {
      const userId = res.locals.userId;
      const products = req.body.products;
      return await ordersService.createOrder({
        userId: userId,
        products: products,
      });
    }),
  );

  router.get(
    '/',
    checkAccessTokenMiddleware,
    validAccessTokenOrRejectMiddleware,
    controllerWrapper(async (req, res) => {
      const userId = res.locals.userId;
      return await ordersService.getOrdersByUserId({ userId });
    }),
  );

  return router;
}

module.exports = makeOrdersController;
