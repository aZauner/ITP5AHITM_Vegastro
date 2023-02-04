import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException } from '@nestjs/common';
import { MealDocument } from 'src/schema/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealDetails } from './entities/meal.entity';
import { MealService } from './meal.service';

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

  @Get()
  getAllMeals(): Promise<MealDetails[] | HttpException> {
    return this.mealService.getAll();
  }
}
