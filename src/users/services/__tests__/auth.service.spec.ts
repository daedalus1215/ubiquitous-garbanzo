import { Test } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UsersService } from "../users.service";
import { User } from "src/users/user.entity";
import { BadRequestException } from "@nestjs/common";



describe('AuthService', () => {
    // Arrange
    let target: AuthService;
    let fakeUsersService: Partial<UsersService>;

    beforeEach(async () => {
        const users: User[] = [];
        fakeUsersService = {
            find: (email: string) => Promise.resolve(users.filter(user => user.email === email)),
            create: (email: string, password: string) => {
                const user = { id: Math.floor(Math.random() * 9999999), email, password } as User;
                users.push(user);
                return Promise.resolve(user);
            },
            update: (id: number, attrs: Partial<User>) => Promise.resolve({ id: 1, ...attrs } as User)
        };

        const module = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UsersService,
                    useValue: fakeUsersService
                }
            ],
        }).compile();

        target = module.get(AuthService);
    });
    describe('#exists', () => {
        it('should create an instance of auth service', async () => {
            // Arrange

            // Act

            // Assert
            expect(target).toBeDefined();
        });
    });

    describe('#signup', () => {
        it('should creates a new user with a salted and hashed password', async () => {
            // Arrange
            // Act
            const actual = await target.signup('asdf@asdf.com', 'asdf');

            // Assert
            expect(actual.password).not.toEqual('asdf');
            const [salt, hash] = actual.password.split('.');
            expect(salt).toBeDefined();
            expect(hash).toBeDefined();
        });

        it('should throws an error if user signs up with email that is in use', async () => {
            // Arrange
            await target.signup('asdf@asdf.com', 'mypassword');
            // Act
            // Assert
            await expect(target.signup('asdf@asdf.com', 'asdf'))
                .rejects
                .toThrow(BadRequestException);
        });
    });

    describe('#signin', () => {
        it('should throw if signin called with an unused email', async () => {
            // Arrange
            await target.signup('asdf@asdf.com', 'mypassword');
            // Act & Assert
            await expect(target.signin('asdf@asd.com', 'asdf'))
                .rejects
                .toThrow(BadRequestException);
        });

        it('throws if an invalid password is provided', async () => {
            // Arrange
            await target.signup('asdf@asdf.com', 'mypassword');

            // Act & Assert
            await expect(target.signin('asdf@asdf.com', 'passowrd'))
                .rejects
                .toThrow(BadRequestException);
        });
    });
});
