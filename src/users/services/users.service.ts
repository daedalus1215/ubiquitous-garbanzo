import { Injectable, NotFoundException } from "@nestjs/common";
import { Repository } from "typeorm";
import { User } from "../user.entity";
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
            throw new NotFoundException('user not found'); // we are not using websocket or grpc so we can do this. But this is rather bad form if we want our domain to stay agnostic with inbound adapters.
        }
        return this.repo.save(Object.assign(user, attrs));
    }

    async remove(id: number) {
        const user = await this.findOne(id);
        if (!user) {
            throw new NotFoundException('user not found');  // we are not using websocket or grpc so we can do this. But this is rather bad form if we want our domain to stay agnostic with inbound adapters.
        }
        return this.repo.remove(user);
    }
}