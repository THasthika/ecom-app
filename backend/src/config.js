const { dirname } = require('path');

const config = {
  APP_SECRET: process.env.APP_SECRET || 'super-secret',
  APP_SALT_ROUNDS: process.env.APP_SALT_ROUNDS || 10,
  APP_IMAGE_DIR: process.env.APP_IMAGE_DIR || 'data/images',
  APP_ROOT: dirname(__dirname),

  MEM_HOST: process.env.MEM_HOST,
  MEM_PORT: process.env.MEM_PORT,

  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_PORT: process.env.DB_PORT || 5432,
  DB_USER: process.env.DB_USER || 'ecomuser',
  DB_PASS: process.env.DB_PASS || 'ecompass',
  DB_NAME: process.env.DB_NAME || 'ecom',
};

function makeDBUrl() {
  return `postgresql://${config.DB_USER}:${config.DB_PASS}@${config.DB_HOST}:${config.DB_PORT}/${config.DB_NAME}`;
}

module.exports = {
  ...config,
  makeDBUrl,
};
