import { Test, TestingModule } from '@nestjs/testing';
import { EventHubService } from '../src/config/event.hub.service';

// Mock the EventHubConsumerClient
jest.mock('@azure/event-hubs');

describe('EventHubService', () => {
  let service: EventHubService;
  let mockEventHubConsumerClient: jest.mock;

  beforeEach(async () => {
    // Clear the mock implementation before each test
    jest.clearAllMocks();

    mockEventHubConsumerClient = new jest.mock();
    mockEventHubConsumerClient.prototype.subscribe = jest.fn();

    jest.mock('@azure/event-hubs', () => ({
      EventHubConsumerClient: mockEventHubConsumerClient,
    }));

    const module: TestingModule = await Test.createTestingModule({
      providers: [EventHubService],
    }).compile();

    service = module.get<EventHubService>(EventHubService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('connect', () => {
    it('should connect to Event Hub', async () => {
      await service.connect();

      // Verify that the EventHubConsumerClient is instantiated with the correct parameters
      expect(mockEventHubConsumerClient).toHaveBeenCalledWith('YOUR_EVENT_HUB_NAME', 'YOUR_EVENT_HUBS_CONNECTION_STRING');
    });
  });

  describe('consumeData', () => {
    it('should subscribe to events', async () => {
      await service.consumeData();

      // Verify that the subscribe method is called
      expect(mockEventHubConsumerClient.prototype.subscribe).toHaveBeenCalled();
    });

    // Add more test cases as needed
  });
});
