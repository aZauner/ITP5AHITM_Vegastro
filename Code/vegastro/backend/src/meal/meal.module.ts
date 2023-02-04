import { Module } from '@nestjs/common';
import { MealService } from './meal.service';
import { MealController } from './meal.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Meal, MealSchema } from '../schema/meal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Meal.name,
        schema: MealSchema
      }
    ])
  ],
  providers: [MealService],
  controllers: [MealController],
})
export class MealModule { }
