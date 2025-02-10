import { ForbiddenException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class TimeRestrictionMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const currentTime = new Date();
        const currentHour = currentTime.getHours();
        if(currentHour < 10 || currentHour >= 19) throw new ForbiddenException('Requests are allowed only between 10:00 AM and 7:00 PM');
        next()
    }
}