import {BelongsTo, BelongsToMany, Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Role} from "../roles/roles.model";
import {UserRoles} from "../roles/user-roles.model";
import {User} from "../users/users.model";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
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
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User

}
