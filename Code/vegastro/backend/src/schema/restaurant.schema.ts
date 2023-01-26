import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class Restaurant {
  @Prop({required:true})
  restaurantName: string;
  
  @Prop({required:true})
  latitude: number;
  
  @Prop({required:true})
  longitude: number;
}

export type RestaurantDocument = Restaurant & Document;
export const RestaurantSchema = SchemaFactory.createForClass(Restaurant)