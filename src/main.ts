import { NestFactory } from '@nestjs/core';
import { MessagesModule } from './messages/messages.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(MessagesModule);
    app.useGlobalPipes(new ValidationPipe()); // validate every single request that comes into our app.
    await app.listen(3000);
};

bootstrap();