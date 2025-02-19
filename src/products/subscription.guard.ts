import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class SubscriptionGuard implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const headers = request.headers
        if(!headers['user-id']) throw new BadRequestException('no permission for this action')
        return true
    }
}