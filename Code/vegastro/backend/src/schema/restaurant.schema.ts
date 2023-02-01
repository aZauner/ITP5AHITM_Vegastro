import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { UserDetails } from 'src/user/entities/user.entity';
import { User } from './user.schema';
@Schema()
export class Restaurant {
  @Prop({unique: true, required: true})
  restaurantName: string;
  
  @Prop({required:true})
  latitude: number;
  
  @Prop({required:true})
  longitude: number;
}

export type RestaurantDocument = Restaurant & Document;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)