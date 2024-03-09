import { Controller, Get, Post } from '@nestjs/common';

@Controller('messages')
export class MessagesController {
    @Get()
    listMessages() {
        return {"hi there": "hi there"};
    }

    @Post()
    createMessages() {

    }

    @Get("/:id")
    getMessage() {

    }
}
