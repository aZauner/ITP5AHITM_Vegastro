import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';
@Schema()
export class Restaurant {
  @Prop({unique: true, required: true})
  restaurantName: string;
  
  @Prop({required:true})
  latitude: number;
  
  @Prop({required:true})
  longitude: number;

  @Prop({type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true})
  owner: User
}

export type RestaurantDocument = Restaurant & Document;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)