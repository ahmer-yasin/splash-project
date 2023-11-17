import { Injectable } from '@nestjs/common';
import { ServiceBusService } from './bus.service';
import { MongoDBService } from './database.service';

@Injectable()
export class QueueListenerService {
  constructor(
    private readonly serviceBusService: ServiceBusService,
    private readonly mongoDBService: MongoDBService,
  ) {}

  async listenAndStore(queueName) {
    const receiver = this.serviceBusService.client.createReceiver(queueName);
    receiver.subscribe({
      processMessage: async (message) => {
        // process and store in MongoDB
        await this.mongoDBService.storeData(message.body);
      },
      processError: async (err) => {
        console.error(err);
      },
    });
  }
}