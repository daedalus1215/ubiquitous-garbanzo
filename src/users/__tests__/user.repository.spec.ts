import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/users/user.entity';
import { TestDataSource } from 'src/test.config'; // Import your test database configuration

describe('UserRepository', () => {
  let repository: Repository<User>;

  beforeAll(async () => {
    await TestDataSource.initialize();

    // Create a module with a dynamic repository provider
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(User),
          useValue: TestDataSource.getRepository(User), // Use the actual repository from TestDataSource
        },
      ],
    }).compile();

    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  afterAll(async () => {
    await TestDataSource.destroy(); // Cleanup database
  });

  it('should insert a new user and retrieve it', async () => {
    // Create a new user
    const newUser = repository.create({
      email: 'test@example.com',
      password: 'password',
      admin: true,
    });

    // Save the user to the database
    await repository.save(newUser);

    // Retrieve the user from the database
    const savedUser = await repository.findOne({
      where: { email: 'test@example.com' },
    });

    // Verify that the saved user matches the new user
    expect(savedUser).toBeDefined();
    expect(savedUser.email).toBe('test@example.com');
    expect(savedUser.password).toBe('password');
    expect(savedUser.admin).toBe(true);
  });

  // Add more tests for other repository methods if needed
});
