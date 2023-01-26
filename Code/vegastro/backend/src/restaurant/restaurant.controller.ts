import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
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
}
