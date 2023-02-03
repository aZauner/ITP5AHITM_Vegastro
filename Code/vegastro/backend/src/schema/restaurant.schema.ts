import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export enum FoodType {
  Meat = "meat",
  Vegetarian = "vegetarian",
  Vegan = "vegan"
}

@Schema()
export class Restaurant {
  @Prop({ unique: true, required: true })
  restaurantName: string;

  @Prop({ required: true })
  latitude: number;

  @Prop({ required: true })
  longitude: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Prop({ required: true, enum: FoodType })
  type: FoodType;

  @Prop({ required: false })
  description: string;
}

export type RestaurantDocument = Restaurant & Document;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)