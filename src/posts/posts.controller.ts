import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post, Query,
    Req,
    UploadedFile,
    UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreatePostDto} from "./dto/create-post.dto";
import {PostsService} from "./posts.service";
import {FileInterceptor} from "@nestjs/platform-express";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.model";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";
import {Post as Posts} from "../posts/posts.model";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {GetPostsDto} from "./dto/get-posts.dto";
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
    getAll(@Query() query: GetPostsDto) {
        const { page, limit, startDate, endDate } = query;
        return this.postService.getAllPosts(page, limit, startDate, endDate);
    }

    @ApiOperation({summary: 'Получить пост по id'})
    @ApiResponse({status: 200, type: Posts})
    @Roles("ADMIN")
    @Get('/:id')
    getPost(@Param('id') id: number) {
        return this.postService.getPost(id);
    }

    @ApiOperation({summary: 'Получить посты по id пользователя'})
    @ApiResponse({status: 200, type: [Posts]})
    @Roles("ADMIN")
    @Get('/:id')
    getAllUserPosts(@Param('id') id: number) {
        return this.postService.getAllUserPosts(id);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deletePost(@Param('id') id: string, @Req() req): Promise<void> {
        const user = req.user;
        await this.postService.deletePost(+id, user);
    }

}
