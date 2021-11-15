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

class UnauthroizedException extends HttpException {
  constructor(message = 'Unauthroized') {
    super(401, message);
  }
}

class ForbiddenException extends HttpException {
  constructor(message = 'Forbidden') {
    super(403, message);
  }
}

module.exports = {
  HttpException,
  NotFoundException,
  InternalServerException,
  BadRequestException,
  ConflictException,
  UnauthroizedException,
  ForbiddenException,
};
