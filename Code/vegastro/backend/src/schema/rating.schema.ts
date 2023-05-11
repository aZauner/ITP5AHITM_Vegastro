import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Schema()
export class Rating {
  @Prop({ required: true })
  userToken: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true })
  restaurant: Restaurant

  @Prop({ required: true })
  stars: number;

  @Prop({ required: true })
  comment: string

  @Prop({ required: true })
  date: Date
}

export type RatingDocument = Rating & Document;
export const RatingSchema = SchemaFactory.createForClass(Rating)