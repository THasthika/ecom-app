const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const config = require('../config');
const { getRedisClient } = require('./memdb');

const ACCESS_TOKEN_EXPIRY = 60 * 60 * 4;
const REDIS_ACCESS_TOKEN_EXPIRY = ACCESS_TOKEN_EXPIRY + 60;

function hashPassword(password) {
  return bcrypt.hashSync(password, config.APP_SALT_ROUNDS);
}

function comparePassword(hash, password) {
  return bcrypt.compareSync(password, hash);
}

function sha1Hash(data) {
  return crypto.createHash('sha1').update(data).digest('hex');
}

function hashToken(token) {
  return sha1Hash(token);
}

async function createAccessToken(userId, userData) {
  redisClient = await getRedisClient();
  const payload = userData;
  const token = jwt.sign({ id: userId, data: payload }, config.APP_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const tokenHash = hashToken(token);

  // store token hash in redis
  const key = `${userId}:acc:${tokenHash}`;
  await redisClient.set(key, '1', {
    EX: REDIS_ACCESS_TOKEN_EXPIRY,
  });

  return token;
}

async function checkAccessToken(token) {
  redisClient = await getRedisClient();
  try {
    const decodedToken = jwt.verify(token, config.APP_SECRET);
    const userId = decodedToken.id;

    const tokenHash = hashToken(token);
    // check redis for token
    const exists = await redisClient.exists(`${userId}:acc:${tokenHash}`);

    if (exists) {
      return userId;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
    return false;
  }
}

module.exports = {
  hashPassword,
  comparePassword,
  createAccessToken,
  checkAccessToken,
};
