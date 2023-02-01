import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { RestaurantDocument } from 'src/schema/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDetails } from './entities/restaurant.entity';
import { RestaurantService } from './restaurant.service';

@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get(':name')
  findOne(@Param('name') name: string): Promise<RestaurantDetails | null> {
    return this.restaurantService.findByName(name);
  }

  @Post('create')
  create(@Body() restaurant: CreateRestaurantDto): Promise<RestaurantDocument | null> {
    return this.restaurantService.create(restaurant);
  }

  @Get('getNearPosition/:northLat/:northLon/:southLat/:southLon')
  findRestaqurantsNearPosition(@Param('northLat') northLat: number , @Param('northLon') northLon: number, @Param('southLat') southLat: number , @Param('southLon') southLon: number): Promise<RestaurantDetails[] | HttpException> {
    return this.restaurantService.findRestaurantsNearPosion(northLat, northLon, southLat , southLon);
  }
}
