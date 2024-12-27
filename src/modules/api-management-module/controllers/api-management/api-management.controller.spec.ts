import { Test, TestingModule } from '@nestjs/testing';
import { ApiManagementController } from './api-management.controller';

describe('ApiManagementController', () => {
  let controller: ApiManagementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ApiManagementController],
    }).compile();

    controller = module.get<ApiManagementController>(ApiManagementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
