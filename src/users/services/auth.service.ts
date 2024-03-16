import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { UsersService } from "./users.service";
import { promisify } from "util";
import { scrypt as _scrypt, randomBytes } from 'crypto';


const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(private userService: UsersService) { }

    async signup(email: string, password: string) {
        const userWithEmail = this.userService.find(email);
        if (!userWithEmail) {
            throw new BadRequestException(`User not found with email: ${email}`);
        }
        // Hash the users password
        // Generatge a salt
        const salt = randomBytes(8).toString('hex');
        // hash the salt and the password together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = `${salt}.${hash.toString('hex')}`;

        // Create a new user and save it
        const user = await this.userService.create(email, result);


        // return the user
    }

    signin() {

    }
}