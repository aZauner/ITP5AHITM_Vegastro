import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Restaurant } from './restaurant.schema';

@Schema()
export class Ratingupvotes {
  @Prop({ required: true })
  userToken: string;  

  @Prop({ required: true })
  ratingId: string;

}

export type RatingupvotesDocument = Ratingupvotes & Document;
export const RatingupvotesSchema = SchemaFactory.createForClass(Ratingupvotes)