const config = require('../config');

const redis = require('redis');

var client = null;

/**
 *
 * @returns Redis Client
 */
async function getRedisClient() {
  if (!client) {
    client = redis.createClient({
      socket: {
        port: config.MEM_PORT,
        host: config.MEM_HOST,
      },
    });
    await client.connect();
  }

  return client;
}

async function initializeRedisClient() {
  getRedisClient();
}

module.exports = {
  getRedisClient,
  initializeRedisClient,
};
