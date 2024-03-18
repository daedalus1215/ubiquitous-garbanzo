import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { UsersService } from "../services/users.service";

/**
 * Cannot look user up in decorator, so we must create interceptor (because we can DI UsersService into interceptors).
 */
@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
    constructor(private userService: UsersService) { }

    async intercept(context: ExecutionContext, handler: CallHandler<any>): Promise<Observable<any>> {
        const request = context.switchToHttp().getRequest();
        const { userId} = request.session || {};
        
        if(userId) {
            const user = await this.userService.findOne(userId);
            // must assign user into request, this is how the decorator gets access.
            request.currentUser = user;
        }
        return handler.handle();
    }
}