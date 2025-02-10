import { HttpException, HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class DeviceMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const userAgent = req.headers['user-agent'] || '';
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        if (isMobile) {
            throw new HttpException('access restricted to desktop devices', HttpStatus.FORBIDDEN)
          }
        next()
    }
}