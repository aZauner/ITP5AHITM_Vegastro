import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put, HttpStatus } from '@nestjs/common';
import { RestaurantDocument } from 'src/schema/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDetails } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) { }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<RestaurantDetails | null> {
    return this.restaurantService.findByName(id);
  }

  @Post('create')
  create(@Body() restaurant: CreateRestaurantDto): Promise<RestaurantDocument | HttpException> {
    return this.restaurantService.create(restaurant);
  }

  @Get('getNearPosition/:northLat/:northLon/:southLat/:southLon')
  findRestaqurantsNearPosition(@Param('northLat') northLat: number, @Param('northLon') northLon: number, @Param('southLat') southLat: number, @Param('southLon') southLon: number): Promise<RestaurantDetails[] | HttpException> {
    return this.restaurantService.findRestaurantsNearPosion(northLat, northLon, southLat, southLon);
  }

  @Get()
  getAllRestaurants(): Promise<RestaurantDetails[] | HttpException> {
    return this.restaurantService.getAllRstaurants();
  }

  @Put('addMealToMenu')
  addMealToMenu(@Body() input : { mealid: string ,restaurantid: string }): Promise<HttpStatus | HttpException> {
    return this.restaurantService.addMealToMenu( input.mealid , input.restaurantid)
  }  
  
  @Get('getByOwner/:token')
  getByOwner(@Param('token') token: string): Promise<RestaurantDetails[] | HttpException> {
    return this.restaurantService.getByOwner(token);
  }  
}
