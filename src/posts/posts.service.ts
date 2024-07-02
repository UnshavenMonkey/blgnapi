import {ForbiddenException, Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/users.model";
import {Op} from "sequelize";
import {of} from "rxjs";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                @InjectModel(User) private userRepository: typeof User,

                private fileService: FilesService) {}

    async create(dto: CreatePostDto, image: any, userId: number) {
        if (!!image) {
            const fileName = await this.fileService.createFile(image);
            dto.image = fileName
        } else {
            dto.image = null
        }

        const user = await this.userRepository.findByPk(userId);
        if (!user) {
            throw new NotFoundException('User not found');
        }

        const post = await this.postRepository.create({...dto, author: user.email, userId: user.id});
        return post;
    }

    async getAllPosts(page: number = 1, limit: number = 10, startDate?: string, endDate?: string) {
        const offset = (page - 1) * limit;
        const where: any = {};
        if (startDate && endDate) {
            where.eventDate = {
                [Op.between]: [new Date(startDate), new Date(endDate)]
            };
        } else if (startDate) {
            where.eventDate = {
                [Op.gte]: new Date(startDate)
            };
        } else if (endDate) {
            where.eventDate = {
                [Op.lte]: new Date(endDate)
            };
        }

        const { rows, count } = await this.postRepository.findAndCountAll({
            where,
            limit,
            offset,
            include: { all: true },
        });
        return {
            posts: rows,
            total: count,
            page,
            limit,
        };
        // const posts = await this.postRepository.findAll({include: {all: true}});
        // return posts;
    }

    async getPost(id: number) {
        const post = await this.postRepository.findOne({where: {id}})
        return post;
    }

    async getAllUserPosts(id: number) {
        const posts = await this.postRepository.findAll({where:{author: id}});
        return posts;
    }

    async deletePost(postId: number, user: User): Promise<void> {
        const post = await this.postRepository.findOne({ where: { id: postId } });

        if (!post) {
            throw new NotFoundException('Post not found');
        }

        if (post.userId !== user.id && (user.roles.value !== 'ADMIN')) {
            throw new ForbiddenException('Permission denied');
        }

        await this.postRepository.destroy({ where: { id: postId } });
    }
}
