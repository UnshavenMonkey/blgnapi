import {Injectable, NotFoundException} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";
import {User} from "../users/users.model";

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

        const post = await this.postRepository.create({...dto, author: user.email})
        return post;
    }

    async getAllPosts() {
        const posts = await this.postRepository.findAll({include: {all: true}});
        return posts;
    }

    async getPost(id: number) {
        const post = await this.postRepository.findOne({where: {id}})
        return post;
    }

    async getAllUserPosts(id: number) {
        const posts = await this.postRepository.findAll({where:{author: id}});
        return posts;
    }
}
