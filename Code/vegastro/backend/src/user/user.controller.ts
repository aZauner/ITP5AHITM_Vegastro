import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { UserDetails } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get(':id')
  findOne(@Param('id') id: string): Promise<UserDetails | null> {
    return this.userService.findById(id);
  }
  
  @Put('addFvouriteRestaurant')
  create(@Body() input : {restaurantName: String , username: String}): Promise<HttpStatus | HttpException> {
    return this.userService.AddFvouriteRestaurant(input.restaurantName, input.username)
  }

}
