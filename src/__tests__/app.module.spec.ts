import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TestDataSource } from '../test.config'; // Import your test database configuration

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    await TestDataSource.initialize();
    
    app = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
  });

  afterAll(async () => {
    await TestDataSource.destroy(); // Cleanup database
  });

  it('should be defined', () => {
    expect(app).toBeDefined();
  });

  // Add more tests here
});
