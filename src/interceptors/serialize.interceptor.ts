import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";


export class SerializeInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
        console.log('Im running before the handler', context);
        return next.handle().pipe(map((data: any) => {
            console.log('Im running before response is set out!')
        }));
    }
}