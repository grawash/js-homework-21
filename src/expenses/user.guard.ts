import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { isValidObjectId } from "mongoose";
import { Observable } from "rxjs";

@Injectable()
export class UserGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const headers = request.headers
        if(!headers['user-id']) throw new BadRequestException('no permission for this action')
        if(!isValidObjectId(headers['user-id'])) throw new BadRequestException("invalid id provided")
        return true
    }
}