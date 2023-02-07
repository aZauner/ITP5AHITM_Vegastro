import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { FoodType } from './restaurant.schema';

export enum AllergicType {
  Lactose = "Laktose",
  Gluten = "Gluten"
}

@Schema()
export class Meal {
  @Prop({ required: true })
  title: string;

  @Prop({ required: false })
  description: string;
  
  @Prop({ required: true, enum: FoodType })
  type: FoodType;

  @Prop({ required: true })
  price: number;

  @Prop({ required: false, enum: AllergicType })
  allergic: AllergicType;
}

export type MealDocument = Meal & Document;
export const MealSchema = SchemaFactory.createForClass(Meal)