import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { User } from './user.entity';

describe('UsersController', () => {
  let target: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => Promise.resolve({ id, email: 'asdf@asdf.com', password: 'mypassword' } as User),
      find: (email: string) => Promise.resolve([{ id: 1, email, password: 'asdf' } as User]),
      // remove: (id: number) => Promise<User>,
      // update: () => {}
    };
    fakeAuthService = {
      // signup: () => {},
      // signin: () => {}
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: fakeUsersService
        },
        {
          provide: AuthService,
          useValue: fakeAuthService
        }
      ]
    }).compile();

    target = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(target).toBeDefined();
  });
});
