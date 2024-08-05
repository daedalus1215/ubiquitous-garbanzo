import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/services/users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { TestDataSource } from 'src/test.config'; // Import your test database configuration

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeAll(async () => {
    await TestDataSource.initialize();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: TestDataSource.getRepository(User), // Use the actual repository from the data source
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await TestDataSource.destroy(); // Cleanup database
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new user', async () => {
    const user = await service.create('test@example.com', 'password');
    expect(user).toBeDefined();
    expect(user.email).toBe('test@example.com');

    // Verify that the user was saved in the database
    const savedUser = await repository.findOneBy({ email: 'test@example.com' });
    console.log('savedUser', savedUser)
    expect(savedUser).toBeDefined();
    expect(savedUser.email).toBe('test@example.com');
  });

  // Add more tests for other CRUD operations
});
