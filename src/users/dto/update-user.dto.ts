import {ApiProperty} from "@nestjs/swagger";
import { IsString} from "class-validator";


export class UpdateUserDto {

    @ApiProperty({example: '/avatar.jpg', description: 'Аватар', required: false})
    avatar?: string | null;

    @ApiProperty({example: 'Иван', description: 'Имя', required: false})
    @IsString({message: 'Должно быть строкой'})
    firstName?: string | null;

    @ApiProperty({example: 'Иванов', description: 'Фамилия', required: false})
    @IsString({message: 'Должно быть строкой'})
    lastName?: string | null;

    @ApiProperty({example: '+72223332233', description: 'Телефон', required: false})
    @IsString({message: 'Должно быть строкой'})
    phone?: string | null;

    @ApiProperty({example: '@username', description: 'WhatsApp', required: false})
    @IsString({message: 'Должно быть строкой'})
    watsap?: string | null;

    @ApiProperty({example: '@username', description: 'Telegram', required: false})
    @IsString({message: 'Должно быть строкой'})
    telegram?: string | null;

    @ApiProperty({example: 'true', description: 'Забанен или нет', required: false})
    banned?: boolean | null;

    @ApiProperty({example: 'За хулиганство', description: 'Причина блокировки', required: false})
    banReason?: string | null;

}