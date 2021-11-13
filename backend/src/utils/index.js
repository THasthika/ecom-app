function jsonResponse(status, data, message) {
  return {
    status,
    data,
    message,
  };
}

function controllerWrapper(fn) {
  return async (req, res, next) => {
    try {
      const ret = await fn(req, res);
      if (typeof ret === 'object' && ret !== null) {
        res.json(jsonResponse('success', ret));
      }
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  controllerWrapper,
  jsonResponse,
};
