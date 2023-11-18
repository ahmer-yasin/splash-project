import { Test, TestingModule } from '@nestjs/testing';
import { ServiceBusService } from '../src/config/bus.service';

describe('ServiceBusService', () => {
  let service: ServiceBusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ServiceBusService,
        // You may need to provide a mock for ServiceBusClient and other dependencies
        // if you don't want to connect to a real service bus during tests.
      ],
    }).compile();

    service = module.get<ServiceBusService>(ServiceBusService);
  });

  afterEach(async () => {
    // Close any connections or cleanup after each test if needed
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('connect', () => {
    it('should connect to Service Bus', async () => {
      // Mock the ServiceBusClient and createSender methods to avoid actual connections
      const mockServiceBusClient = {
        createSender: jest.fn(),
      };

      service.client = mockServiceBusClient;

      await service.connect();

      expect(mockServiceBusClient.createSender).toHaveBeenCalledWith('YOUR_QUEUE_NAME');
    });
  });

  describe('sendDataToQueue', () => {
    it('should send data to the queue', async () => {
      // Mock the ServiceBusClient and createSender methods to avoid actual connections
      const mockServiceBusClient = {
        createSender: jest.fn(),
      };

      service.client = mockServiceBusClient;

      const mockSender = {
        sendMessages: jest.fn(),
        close: jest.fn(),
      };

      jest.spyOn(mockServiceBusClient, 'createSender').mockReturnValue(mockSender);

      const queueName = 'mockQueue';
      const data = { message: 'Hello, Jest!' };

      await service.sendDataToQueue(queueName, data);

      expect(mockServiceBusClient.createSender).toHaveBeenCalledWith(queueName);
      expect(mockSender.sendMessages).toHaveBeenCalledWith(data);
      expect(mockSender.close).toHaveBeenCalled();
    });
  });
});