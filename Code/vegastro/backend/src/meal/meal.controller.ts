import { Controller, Get, Put, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { MealDocument } from 'src/schema/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealDetails } from './entities/meal.entity';
import { MealService } from './meal.service';
import { FoodType } from 'src/schema/restaurant.schema';

@Controller('meal')
export class MealController {
  constructor(private readonly mealService: MealService) { }

  @Get(':title')
  findOne(@Param('title') title: string): Promise<MealDetails | null> {
    return this.mealService.findByName(title);
  }

  @Post('create')
  create(@Body() meal: CreateMealDto): Promise<MealDocument | HttpException> {
    return this.mealService.create(meal);
  }

  @Get('/getById/:id')
  getMealById(@Param('id') id: string): Promise<MealDetails | HttpException> {
    return this.mealService.getMealById(id);
  }

  @Get()
  getAllMeals(): Promise<MealDetails[] | HttpException> {
    return this.mealService.getAll();
  }

  @Put('changeActiveStatus')
  chnageActive(@Body() input : { mealid: string }): Promise<any> {
    return this.mealService.chnageActive( input.mealid)
  } 
  
  @Put('changeMealValues')
  changeMealValues(@Body() input : { mealId: string ,title: string , description: string,  type: string, price: string }): Promise<any> {
         
    return this.mealService.changeMealValues( input)
  }
}
