import {Body, Controller, Get, Param, Post, Req, UploadedFile, UseGuards, UseInterceptors} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {Post as Posts} from "../posts/posts.model";
@ApiBearerAuth()
@ApiTags('Посты')
@Controller('posts')
export class PostsController {

    constructor(private postService: PostsService) {}

    @ApiOperation({summary: 'Создание поста'})
    @ApiResponse({status: 200, type: Posts})
    @ApiConsumes('multipart/form-data')
    @Post()
    @UseInterceptors(FileInterceptor('image'))
    createPost(@Body() dto: CreatePostDto,
               @UploadedFile() image, @Req() req) {
        const userId = req.user.id;
        return this.postService.create(dto, image, userId)
    }

    @ApiOperation({summary: 'Получить все посты'})
    @ApiResponse({status: 200, type: [Posts]})
    @Get()
    getAll() {
        return this.postService.getAllPosts();
    }

    @ApiOperation({summary: 'Получить пост по id'})
    @ApiResponse({status: 200, type: Posts})
    @Roles("admin")
    @Get('/:id')
    getPost(@Param('id') id: number) {
        return this.postService.getPost(id);
    }

    @ApiOperation({summary: 'Получить посты по id пользователя'})
    @ApiResponse({status: 200, type: [Posts]})
    @Roles("admin")
    @Get('/:id')
    getAllUserPosts(@Param('id') id: number) {
        return this.postService.getAllUserPosts(id);
    }

}
