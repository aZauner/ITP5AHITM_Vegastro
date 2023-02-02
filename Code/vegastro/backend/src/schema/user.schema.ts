import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Restaurant } from './restaurant.schema';
@Schema()
export class User {
  @Prop({required:true})
  firstname: string;
  
  @Prop({required:true})
  lastname: string;

  @Prop({required: true, unique: true})
  username: string;

  @Prop({required:true, unique:true})
  email: string;
  
  @Prop({required: true})
  password: string;

  @Prop({type: [{type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant'}] ,required: false})
  favouriteRestaurants: [Restaurant];
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)