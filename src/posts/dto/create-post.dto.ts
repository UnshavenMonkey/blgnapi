import {ApiProperty} from "@nestjs/swagger";
import {IsString, Length} from "class-validator";

export class CreatePostDto {
    @ApiProperty({example: 'Футбол', description: 'Название поста'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 250, {message: 'Не меньше 3 символов'})
    readonly title: string;

    @ApiProperty({example: 'Лужнинки 18:00', description: 'текст поста'})
    @IsString({message: 'Должно быть строкой'})
    @Length(3, 250, {message: 'Не меньше 3 символов'})
    readonly content: string;
    @ApiProperty({required: false, example: 'Изображение', description: 'Изображение поста', type: 'string', format: 'binary'})
    image: string;

    @ApiProperty({ example: '2024-06-01', description: 'Дата события' })
    readonly eventDate: string;

    @ApiProperty({ example: '18:00', description: 'Время события' })
    readonly eventTime: string;

    @ApiProperty({ example: '2 часа', description: 'Длительность события' })
    @IsString({ message: 'Должно быть строкой' })
    readonly eventDuration: string;

    @ApiProperty({ example: 'Лужники', description: 'Место события' })
    @IsString({ message: 'Должно быть строкой' })
    readonly eventAddress: string;

    readonly userId: number;
}
