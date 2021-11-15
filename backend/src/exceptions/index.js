class HttpException {
  constructor(status, message) {
    this.status = status;
    this.message = message;
  }
}

class NotFoundException extends HttpException {
  constructor(message = 'Not Found') {
    super(404, message);
  }
}

class InternalServerException extends HttpException {
  constructor(message = 'Internal Server Error') {
    super(500, message);
  }
}

class BadRequestException extends HttpException {
  constructor(message = 'Bad Request') {
    super(400, message);
  }
}

class ConflictException extends HttpException {
  constructor(message = 'Conflict') {
    super(409, message);
  }
}

module.exports = {
  HttpException,
  NotFoundException,
  InternalServerException,
  BadRequestException,
  ConflictException,
};
