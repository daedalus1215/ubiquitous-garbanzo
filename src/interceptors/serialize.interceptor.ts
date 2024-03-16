import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { plainToClass } from "class-transformer";
import { Observable, map } from "rxjs";
import { UserDto } from "src/users/dtos/user.dto";

export const Serialize = (dto: any) => {
    return UseInterceptors(new SerializeInterceptor(dto));
}

export class SerializeInterceptor implements NestInterceptor {
    constructor(private dto: any) {
        this.dto = dto;
    }

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        return next.handle().pipe(map((data: any) => {
            return plainToClass(this.dto, data, {
                excludeExtraneousValues: true
            });
        }));
    }
}