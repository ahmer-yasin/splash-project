import { Injectable } from '@nestjs/common';
import { EventHubConsumerClient} from '@azure/event-hubs';


// Replace with your Event Hub namespace and key information
const connectionString = "YOUR_EVENT_HUBS_CONNECTION_STRING";
const eventHubName = "YOUR_EVENT_HUB_NAME";

@Injectable()
export class EventHubService {
  private consumerClinet;

  async connect() {
      this.consumerClinet = new EventHubConsumerClient(eventHubName, connectionString);
  }

  async consumeData() {
    this.consumerClinet.subscribe({
      processEvents: async (events, context) => {
        // process and send to Service Bus queues
      },
      processError: async (err, context) => {
        console.error(err);
      },
    });
  }
}
