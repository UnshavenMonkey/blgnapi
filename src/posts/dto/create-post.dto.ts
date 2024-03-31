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
    readonly userId: number;
}
