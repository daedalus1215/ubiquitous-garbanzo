import { Test } from "@nestjs/testing";
import { AuthService } from "../auth.service";
import { UsersService } from "../users.service";
import { User } from "src/users/user.entity";



describe('AuthService', () => {
    // Arrange
    let target: AuthService;

    beforeEach(async () => {
        const fakeUsersService: Partial<UsersService> = {
            find: () => Promise.resolve([]),
            create: (email: string, password: string) => Promise.resolve({ id: 1, email, password } as User),
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

    it('can create an instance of auth service', async () => {
        // Arrange

        // Act

        // Assert
        expect(target).toBeDefined();
    });

    it('creates a new user with a salted and hashed password', async () => {
        // Arrange

        // Act
        const actual = await target.signup('asdf@asdf.com', 'asdf');

        // Assert
        expect(actual.password).not.toEqual('asdf');
        const [salt, hash] = actual.password.split('.');
        expect(salt).toBeDefined();
        expect(hash).toBeDefined();
    });
});
