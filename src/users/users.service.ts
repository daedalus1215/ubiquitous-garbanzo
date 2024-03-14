import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UsersService {
    constructor(@InjectRepository(User) private repo: Repository<User>) {
        this.repo = repo;
    }

    create(email: string, password: string) {
        const entity = this.repo.create({ email, password });

        return this.repo.save(entity);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id });
    }

    find(email: string) {
        return this.repo.find({ where: { email } })
    }

    async update(id: number, attrs: Partial<User>) {
        const user = await this.findOne(id);
        if (!user) {
            throw new Error('user not found');
        }
        return this.repo.save(Object.assign(user, attrs));
    }
}
