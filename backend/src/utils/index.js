const fs = require('fs-extra');
const randomstring = require('randomstring');
const path = require('path');
const config = require('../config');
const bcrypt = require('bcrypt');

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
      } else if (ret !== null) {
        res.send(ret);
      }
    } catch (err) {
      next(err);
    }
  };
}

function moveFile(src, dest, overwrite = true) {
  return fs.move(src, dest, {
    overwrite: overwrite,
  });
}

function removeFile(fpath) {
  return fs.remove(fpath);
}

function randomAlphabeticString(length) {
  return randomstring.generate({
    length: length,
    charset: 'alphabetic',
  });
}

function getFileExtension(fpath) {
  return path.extname(fpath).slice(1);
}

function joinPath(...paths) {
  return path.join(...paths);
}

function hashPassword(password) {
  return bcrypt.hashSync(password, config.APP_SALT_ROUNDS);
}

function comparePassword(hash, password) {
  return bcrypt.compareSync(password, hash);
}

module.exports = {
  controllerWrapper,
  jsonResponse,
  moveFile,
  removeFile,
  randomAlphabeticString,
  getFileExtension,
  joinPath,
  hashPassword,
  comparePassword,
};
