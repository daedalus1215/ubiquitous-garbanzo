import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMessageDto } from '../dtos/create-message.dto';
import { MessagesService } from '../services/messages.service';

@Controller('messages')
export class MessagesController {
    messagesService: MessagesService;

    constructor() {
        //@TODO: Swap out for DI
        this.messagesService = new MessagesService();
    }

    @Get()
    listMessages() {
        return this.messagesService.findAll();
    }

    @Post()
    createMessages(@Body() body: CreateMessageDto) {
        console.log('body', body)
        return this.messagesService.create(body.content);

    }

    @Get("/:id")
    getMessage(@Param() id: string) {
        return this.messagesService.findOne(id);
    }
}
