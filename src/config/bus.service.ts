import { Injectable } from '@nestjs/common';
import { ServiceBusClient } from '@azure/service-bus';

// Replace with your Service Bus namespace and key information
const connectionString = "YOUR_SERVICE_BUS_CONNECTION_STRING";
const queueName = "YOUR_QUEUE_NAME";

@Injectable()
export class ServiceBusService {
  public client;
  public sender;

  async connect() {
    this.client = new  ServiceBusClient(connectionString);
    this.sender = this.client.createSender(queueName);
  }

  async sendDataToQueue(queueName, data) {
    const sender = this.client.createSender(queueName);
    await sender.sendMessages(data);
    await sender.close();
  }
}
