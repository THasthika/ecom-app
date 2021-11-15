const express = require('express');
const { body } = require('express-validator');
const {
  validAccessTokenOrRejectMiddleware,
  checkAccessTokenMiddleware,
} = require('../middlewares/auth.middleware');
const validatorMiddleware = require('../middlewares/validator.middleware');
const { controllerWrapper } = require('../utils');

function makeAuthController({ authService }) {
  const router = express.Router();

  router.post(
    '/login',
    body('email').notEmpty().withMessage('email should exist'),
    body('password').notEmpty().withMessage('password should exist'),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await authService.loginUser({
        email: req.body.email,
        password: req.body.password,
      });
    }),
  );

  router.get(
    '/check',
    checkAccessTokenMiddleware,
    validAccessTokenOrRejectMiddleware,
    controllerWrapper((req, res) => {
      return {};
    }),
  );

  return router;
}

module.exports = makeAuthController;
