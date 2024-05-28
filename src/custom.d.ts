import { Request } from 'express';
import { User } from './users/users.model';

declare module 'express' {
    interface Request {
        user?: User; // Определение свойства user в интерфейсе Request
    }
}
