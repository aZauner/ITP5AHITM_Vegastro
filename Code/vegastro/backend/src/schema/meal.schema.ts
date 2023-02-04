import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FoodType } from './restaurant.schema';

@Schema()
export class Meal {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;
  
  @Prop({ required: true, enum: FoodType })
  type: FoodType;
}

export type MealDocument = Meal & Document;
export const MealSchema = SchemaFactory.createForClass(Meal)