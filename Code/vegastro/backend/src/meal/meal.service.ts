import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal, MealDocument } from 'src/schema/meal.schema';
import { CreateMealDto } from './dto/create-meal.dto';
import { MealDetails } from './entities/meal.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectModel(Meal.name)
    private readonly mealModel: Model<MealDocument>
  ) { }

  _getMealDetails(meal: MealDocument): MealDetails {
    return {
      id: meal._id,
      title: meal.title,
      description: meal.description,
      type: meal.type
    };
  }

  async findByName(title: string): Promise<MealDetails | null> {
    const meal = await this.mealModel
      .findOne({ title: title })
      .exec();
    if (!meal) return null;
    return this._getMealDetails(meal);
  }

  async create(meal: CreateMealDto): Promise<MealDocument | HttpException> {
    const newMeal = new this.mealModel(meal);
    return newMeal.save();
  }

  async getAll(): Promise<HttpException | MealDetails[]> {
    const meals = await this.mealModel
      .find()
      .exec();
    if (!meals) return new HttpException('keine Gerichte gefunden', HttpStatus.NOT_FOUND);

    let mealArr = [];
    for (const meal of meals) {
      mealArr.push(this._getMealDetails(meal))
    }
    return mealArr;
  }
}
