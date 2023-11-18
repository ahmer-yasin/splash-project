import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoDBService } from '../src/config/database.service';

describe('MongoDBService (e2e)', () => {
  let service: MongoDBService;
  let mockModel: Model<any>;

  beforeEach(async () => {
    mockModel = {
      create: jest.fn(),
    } as unknown as Model<any>;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MongoDBService,
        {
          provide: getModelToken('Message'),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<MongoDBService>(MongoDBService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('storeData', () => {
    it('should store data in the database', async () => {
      const testData = { message: 'Hello, Jest!' };

      await service.storeData(testData);

      // Verify that the create method of the model is called with the correct data
      expect(mockModel.create).toHaveBeenCalledWith(testData);
    });

    // Add more test cases as needed
  });
});
