import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class MongoDBService {
  constructor(@InjectModel('Message') private readonly messageModel: Model<any>) {}

  async storeData(data) {
    const message = new this.messageModel(data);
    await message.save();
  }
}
