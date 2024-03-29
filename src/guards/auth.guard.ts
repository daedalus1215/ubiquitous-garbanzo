import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Observable } from "rxjs";

/**
 * Make sure a user is logged in before we let them have access to a particular route handler.
 */
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        return request.session.userId;
    }
}