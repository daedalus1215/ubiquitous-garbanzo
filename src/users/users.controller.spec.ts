import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './services/users.service';
import { AuthService } from './services/auth.service';
import { User } from './user.entity';
import { NotFoundException } from '@nestjs/common';
import { Session } from 'inspector';

describe('UsersController', () => {
  let target: UsersController;
  let fakeUsersService: Partial<UsersService>;
  let fakeAuthService: Partial<AuthService>;

  const user = { id: 'id', email: 'asdf@asdf.com', password: 'mypassword' };

  beforeEach(async () => {
    fakeUsersService = {
      findOne: (id: number) => Promise.resolve({ ...user, id } as unknown as User),
      find: (email: string) => Promise.resolve([{ id: 1, email, password: 'asdf' } as User]),
      // remove: (id: number) => Promise<User>,
      // update: () => {}
    };
    fakeAuthService = {
      signin: (email: string, password: string) => Promise.resolve({ ...user, email, password } as unknown as User)
      // signup: () => {},
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

  describe('#findUser', () => {
    it('should throw an error if user with given id is not found', async () => {
      // Arrange
      fakeUsersService.findOne = () => null;

      // Act & Assert
      await expect(target.findUser('1')).rejects.toThrow(NotFoundException);
    });

    it('should return user when found', async () => {
      // Arrange
      const expected = { ...user, id: 1 };

      // Act
      const actual = await target.findUser('1');

      // Act
      expect(actual).toEqual(expected);
    });
  });

  describe('#signin', () => {
    it('should sign in and set userId in session if authService signs user in', async () => {
      // Arrange
      const session = {} as Session;
      const expected = {...user, email:'email', password: 'password'};

      // Act
      const actual = await target.signin({email: expected.email, password: expected.password}, session);

      // Assert
      expect(actual).toEqual(expected);
      expect(session).toEqual({userId: expected.id});
    });
  })

});
