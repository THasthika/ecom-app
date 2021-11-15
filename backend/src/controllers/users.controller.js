const express = require('express');
const { body, param } = require('express-validator');
const validatorMiddleware = require('../middlewares/validator.middleware');
const { controllerWrapper } = require('../utils');

function makeUsersController({ usersService }) {
  const router = express.Router();

  // create user
  router.post(
    '/',
    body('name')
      .isString()
      .withMessage('should be a string')
      .notEmpty()
      .withMessage('should not be empty'),
    body('email')
      .isEmail()
      .withMessage('should be a valid email')
      .notEmpty()
      .withMessage('should not be empty'),
    body('password')
      .isStrongPassword({
        minLength: 8,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0,
      })
      .withMessage('should be a valid password'),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await usersService.createUser({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    }),
  );

  // get user by id
  router.get(
    '/:id',
    param('id').isInt(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await usersService.getUserById(req.params.id);
    }),
  );

  // update user by id
  router.patch(
    '/:id',
    param('id').isInt(),
    body('name').isString().withMessage('should be a string').optional(),
    body('email').isEmail().withMessage('should be a valid email').optional(),
    body('password')
      .isStrongPassword({
        minLength: 8,
        minSymbols: 0,
        minLowercase: 0,
        minUppercase: 0,
      })
      .withMessage('should be a valid password')
      .optional(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await usersService.updateUser(req.params.id, {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
      });
    }),
  );

  // delete user by id
  router.delete(
    '/:id',
    param('id').isInt(),
    validatorMiddleware,
    controllerWrapper(async (req, res) => {
      return await usersService.deleteUser(req.params.id);
    }),
  );

  return router;
}

module.exports = makeUsersController;
