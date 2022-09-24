import { Injectable } from '@nestjs/common';
import { Types } from 'mongoose';
import { WrongObjectIdException } from '@modules/shared/exceptions';
import { GlobalService } from '@modules/config/services';

@Injectable()
export class SharedService {
  constructor(private readonly globalService: GlobalService) {}

  /**
   * throw an error is is is not a valid mongoose objectid
   * @param {string} id ObjectId to validate
   */
  validateObjectId(id: string) {
    const valid = Types.ObjectId.isValid(id) ? true : false;
    if (!valid) {
      throw new WrongObjectIdException();
    }
  }
}
