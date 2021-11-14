const { validationResult } = require('express-validator');
const { jsonResponse } = require('../utils');

module.exports = (req, res, next) => {
  const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
    // Build your resulting errors however you want! String, object, whatever - it works!
    return `${param}: ${msg}`;
  };
  const result = validationResult(req).formatWith(errorFormatter);
  if (!result.isEmpty()) {
    return res
      .status(400)
      .json(jsonResponse('error', { errors: result.array() }, null));
  } else {
    next();
  }
};
