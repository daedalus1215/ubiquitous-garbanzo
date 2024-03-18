import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./services/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./user.entity";
import { AuthService } from "./services/auth.service";
import { CurrentUserInterceptor } from "./interceptors/current-user.interceptor";

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UsersController],
  providers: [UsersService, AuthService, CurrentUserInterceptor],
})
export class UsersModule { }
