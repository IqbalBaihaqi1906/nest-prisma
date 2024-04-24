import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateGroupPostDto, CreatePostDto } from 'src/dtos/Post_dtos';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private postService: PostsService) {}

  @Post('')
  @UsePipes(new ValidationPipe())
  async createPost(@Body() { userId, ...newPostData }: CreatePostDto) {
    const newPost = await this.postService.createNewPost(userId, newPostData);

    return newPost;
  }

  @Post('group')
  @UsePipes(new ValidationPipe())
  async createGroupPost(
    @Body() { userIds, ...GroupPostData }: CreateGroupPostDto,
  ) {
    const newGroupPost = await this.postService.createGroupPost(
      userIds,
      GroupPostData,
    );

    return newGroupPost;
  }

  @Get('group')
  async getGroupPosts() {
    const groupPosts = await this.postService.getGroupPosts();
    return groupPosts;
  }
}
