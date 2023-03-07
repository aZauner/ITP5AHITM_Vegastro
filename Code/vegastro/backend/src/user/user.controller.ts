import { Controller, Get, Post, Body, Patch, Param, Delete, Put, HttpStatus, HttpException } from '@nestjs/common';
import { Restaurant } from 'src/schema/restaurant.schema';
import { UserDetails } from './entities/user.entity';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/favourites/:token')
  findFavouriteRestaurants(@Param('token') token: string): Promise<{favouriteRestaurants: [Restaurant]} | null> {
    return this.userService.findFavouriteRestaurants(token);
  }

  @Get(':token')
  findOne(@Param('token') token: string): Promise< UserDetails | null> {
    return this.userService.findByToken(token);
  }
  
  @Put('addFvouriteRestaurant')
  addFav(@Body() input : {restId: string , token: string}): Promise<HttpStatus | HttpException> {
    return this.userService.addFvouriteRestaurant(input.restId, input.token)
  }

  @Put('changeUserData')
  changeUserData(@Body() input : { token: string ,firstname: string , lastname: string, username: string, email:string}): Promise<HttpStatus | HttpException> {
    return this.userService.changeUserData( input.token ,input.firstname, input.lastname, input.username, input.email)
  }
  
  @Put('removeFvouriteRestaurant')
  removeFav(@Body() input : {restId: string , token: string}): Promise<HttpStatus | HttpException> {
    return this.userService.removeFvouriteRestaurant(input.restId, input.token)
  }

  @Put('addToken')
  addToken(@Body() input : {id: string , token: string}): Promise<HttpStatus | HttpException> {
    return this.userService.addToken(input.id, input.token)
  }

}
