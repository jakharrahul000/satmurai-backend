import { HttpException, HttpStatus } from '@nestjs/common';
import { ExceptionType } from '@modules/shared/enums';

class ThrowException extends HttpException {
  constructor(status: number, type: string, message: string) {
    super(
      {
        status,
        type,
        message,
      },
      status,
    );
  }
}

export class WrongObjectIdException extends ThrowException {
  constructor() {
    super(HttpStatus.NOT_FOUND, ExceptionType.ERROR, 'Id not valid');
  }
}

export class NotFound extends ThrowException {
  constructor(message: string, type?: string) {
    super(HttpStatus.NOT_FOUND, type ? type : ExceptionType.ERROR, message);
  }
}

export class NotAcceptable extends ThrowException {
  constructor(message: string, type?: string) {
    super(
      HttpStatus.NOT_ACCEPTABLE,
      type ? type : ExceptionType.ERROR,
      message,
    );
  }
}

export class Unauthorized extends ThrowException {
  constructor(message: string, type?: string) {
    super(HttpStatus.UNAUTHORIZED, type ? type : ExceptionType.ERROR, message);
  }
}

export class InternalServerError extends ThrowException {
  constructor(message: string, type?: string) {
    super(
      HttpStatus.INTERNAL_SERVER_ERROR,
      type ? type : ExceptionType.ERROR,
      message,
    );
  }
}
