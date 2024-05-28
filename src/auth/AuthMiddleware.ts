import {Injectable, NestMiddleware, UnauthorizedException} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}

    async use(req: Request, res: Response, next: NextFunction) {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(' ')[1];
            try {
                const user = await this.authService.verifyToken(token);
                req.user = user; // Добавляем информацию о пользователе в объект req
            } catch (error) {
                throw new UnauthorizedException('Invalid token');
            }
        }
        next();
    }
    }
