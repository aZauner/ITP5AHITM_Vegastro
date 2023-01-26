import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
@Schema()
export class User {
  @Prop({required:true})
  firstname: string;
  
  @Prop({required:true})
  lastname: string;
  
  @Prop({required:true, unique:true})
  email: string;
  
  @Prop({required: true})
  password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User)