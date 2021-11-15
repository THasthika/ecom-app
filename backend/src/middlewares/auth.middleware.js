const { UnauthroizedException } = require('../exceptions');
const { checkAccessToken } = require('../utils/auth');

function checkAccessTokenMiddleware(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return next();
  }
  const token = authHeader.replace('Bearer ', '');
  checkAccessToken(token)
    .then((userId) => {
      res.locals.tokenValid = userId !== false;
      if (userId !== false) {
        res.locals.userId = userId;
      }
      next();
    })
    .catch((err) => {
      next(err);
    });
}

function validAccessTokenOrRejectMiddleware(req, res, next) {
  if (!res.locals.tokenValid) {
    next(new UnauthroizedException());
  } else {
    next();
  }
}

module.exports = {
  checkAccessTokenMiddleware,
  validAccessTokenOrRejectMiddleware,
};
