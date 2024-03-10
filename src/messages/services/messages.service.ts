import { MessagesRepository } from "../repositories/messages.repository";

export class MessagesService {
    messagesRepo: MessagesRepository;

    constructor() {
        // @TODO: refactor this and use dependency injection
        this.messagesRepo = new MessagesRepository();
    }

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