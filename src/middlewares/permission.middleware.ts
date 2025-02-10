import { ForbiddenException, HttpException, Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";

@Injectable()
export class PermissionMiddleware implements NestMiddleware{
    use(req: Request, res: Response, next: NextFunction) {
        const permission = req.headers['permission']?.toString().toLowerCase()
        if(req.method === "GET" && permission !== "read"){
            throw new ForbiddenException(`permission denied for ${req.method} method`)
        }
        if(req.method === "POST" && permission !== "create"){
            throw new ForbiddenException(`permission denied for ${req.method} method`)
        }
        if(req.method === "PATCH" && permission !== "update"){
            throw new ForbiddenException(`permission denied for ${req.method} method`)
        }
        if(req.method === "DELETE" && permission !== "delete"){
            throw new ForbiddenException(`permission denied for ${req.method} method`)
        }
        next()
    }
}