import { NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

export class CurrentUserMiddleware implements NestMiddleware {
    async use(req: Request, res: Response, next: NextFunction) {
        throw new Error("Method not implemented.");
    }
}