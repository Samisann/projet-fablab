import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from './UserService';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { JwtDTO } from '../dto/jwt.dto';


@Injectable()
export class RetrieveTokenJwtService {

    constructor(private jwtService:JwtService) {}


    public decodeToken(request: Request){
        const tokenBearer = this.extractTokenFromHeader(request);
        const jwtToken  = JSON.stringify(this.jwtService.decode(tokenBearer));
        return JSON.parse(jwtToken) as JwtDTO;
    }

    private extractTokenFromHeader(request: Request): string | undefined {
        const [type, token] = request.headers.authorization?.split(' ') ?? [];
        return type === 'Bearer' ? token : undefined;
    }

}