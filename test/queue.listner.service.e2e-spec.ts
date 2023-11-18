import { Test, TestingModule } from '@nestjs/testing';
import { QueueListenerService } from '../src/config/queue.listner.service';
import { ServiceBusService } from '../src/config/bus.service';
import { MongoDBService } from '../src/config/database.service';

jest.mock('./bus.service');
jest.mock('./database.service');

describe('QueueListenerService', () => {
  let service: QueueListenerService;
  let serviceBusService: ServiceBusService;
  let mongoDBService: MongoDBService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QueueListenerService,
        ServiceBusService,
        MongoDBService,
      ],
    }).compile();

    service = module.get<QueueListenerService>(QueueListenerService);
    serviceBusService = module.get<ServiceBusService>(ServiceBusService);
    mongoDBService = module.get<MongoDBService>(MongoDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('listenAndStore', () => {
    it('should subscribe to the queue and store data in MongoDB', async () => {
      const mockReceiver = {
        subscribe: jest.fn(),
      };

      jest.spyOn(serviceBusService.client, 'createReceiver').mockReturnValue(mockReceiver);

      const testData = { message: 'Hello, Jest!' };

      await service.listenAndStore('testQueue');

      // Simulate message reception
      const processMessageCallback = mockReceiver.subscribe.mock.calls[0][0].processMessage;
      await processMessageCallback({ body: testData });

      // Verify that the createReceiver method is called with the correct queue name
      expect(serviceBusService.client.createReceiver).toHaveBeenCalledWith('testQueue');
      // Verify that the storeData method of MongoDBService is called with the correct data
      expect(mongoDBService.storeData).toHaveBeenCalledWith(testData);
    });

    // Add more test cases as needed
  });
});
