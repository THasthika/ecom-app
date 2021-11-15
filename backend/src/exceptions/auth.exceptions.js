const { BadRequestException } = require('.');

class InvalidCredentialsException extends BadRequestException {
  constructor() {
    super('Invalid Credentials');
  }
}

module.exports = {
  InvalidCredentialsException,
};
