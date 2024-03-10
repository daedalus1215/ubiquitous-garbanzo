import { Injectable } from "@nestjs/common";
import { MessagesRepository } from "../repositories/messages.repository";

@Injectable()
export class MessagesService {
    constructor(public messagesRepo: MessagesRepository) { }

    async findOne(id: string) {
        return this.messagesRepo.findOne(id);
    }

    findAll() {
        return this.messagesRepo.findAll();
    }

    create(content: string) {
        return this.messagesRepo.create(content);
    }
}