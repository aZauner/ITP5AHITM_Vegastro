import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { UserDetails } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model <UserDocument> ) {}
  
  _getUserDetails(user: UserDocument): UserDetails{
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email
    };  
  }

  async findById(id: string): Promise<UserDetails | null> {
    const user = await this.userModel.findById(id).exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findByMail(email: string): Promise<UserDocument | null>{
    return this.userModel.findOne({email}).exec();
  }

  async create(firstname: string, lastname:string, username: string, email:string, hashedPassword: string): Promise<UserDocument>{
    const newUser = new this.userModel({
      firstname,
      lastname,
      email,
      username,
      password:hashedPassword,
    });
    return newUser.save();
  }
}