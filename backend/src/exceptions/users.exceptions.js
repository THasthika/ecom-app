const { ConflictException, NotFoundException } = require('.');

class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super('User Already Exists');
  }
}

class UserNotFoundException extends NotFoundException {
  constructor() {
    super('User Not Found');
  }
}

module.exports = {
  UserAlreadyExistsException,
  UserNotFoundException,
};
