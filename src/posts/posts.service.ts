import { Injectable } from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Post} from "./posts.model";
import {FilesService} from "../files/files.service";

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
                private fileService: FilesService) {}

    async create(dto: CreatePostDto, image: any) {
        if (!!image) {
            const fileName = await this.fileService.createFile(image);
            dto.image = fileName
        } else {
            dto.image = null
        }
        const post = await this.postRepository.create({...dto})
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
