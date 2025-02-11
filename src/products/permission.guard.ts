import { BadRequestException, CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class IsViewer implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const headers = request.headers
        if(!headers.role) throw new BadRequestException('no permission for this action')
        const role = Array.isArray(headers.role) ? headers.role[0] : headers.role;
        if (!['viewer', 'admin', 'editor'].includes(role)) throw new BadRequestException('no permission for this action')
        return true
    }
}

@Injectable()
export class IsEditor implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const headers = request.headers
        if(!headers.role) throw new BadRequestException('no permission for this action')
        const role = Array.isArray(headers.role) ? headers.role[0] : headers.role;
        if (!['admin', 'editor'].includes(role)) throw new BadRequestException('no permission for this action')
        return true
    }
}

@Injectable()
export class IsAdmin implements CanActivate{
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request: Request = context.switchToHttp().getRequest();
        const headers = request.headers
        if(!headers.role) throw new BadRequestException('no permission for this action')
        const role = Array.isArray(headers.role) ? headers.role[0] : headers.role;
        if (!['admin'].includes(role)) throw new BadRequestException('no permission for this action')
        return true
    }
}