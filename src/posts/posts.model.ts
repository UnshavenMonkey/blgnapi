import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
    author: string;
}

@Table({tableName: 'posts'})
export class Post extends Model<Post, PostCreationAttrs> {
    @ApiProperty({example: '1', description: 'Уникальный идентификатор'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Футбол в 18:00', description: 'Заголовок'})
    @Column({type: DataType.STRING, unique: false, allowNull: false})
    title: string;

    @ApiProperty({example: 'Играем в футбол в 18:00 в черкизово', description: 'Текст поста'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: '/image.jpg', description: 'Изображение поста', required: false})
    @Column({type: DataType.STRING, allowNull: true})
    image: string | null;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @ApiProperty({ example: 'user@mail.ru', description: 'Email автора' })
    @Column({ type: DataType.STRING, allowNull: false })
    author: string;

    @ApiProperty({ example: '2024-06-01', description: 'Дата события' })
    @Column({ type: DataType.DATEONLY, allowNull: false })
    eventDate: string;

    @ApiProperty({ example: '18:00', description: 'Время события' })
    @Column({ type: DataType.TIME, allowNull: false })
    eventTime: string;

    @ApiProperty({ example: '2 часа', description: 'Длительность события' })
    @Column({ type: DataType.STRING, allowNull: false })
    eventDuration: string;

    @ApiProperty({ example: 'Лужники', description: 'Место события' })
    @Column({ type: DataType.STRING, allowNull: false })
    eventAddress: string;
}

