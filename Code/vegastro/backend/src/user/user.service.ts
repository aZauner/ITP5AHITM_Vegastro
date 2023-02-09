import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from 'src/schema/restaurant.schema';
import { User, UserDocument } from '../schema/user.schema';
import { UserDetails } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  _getUserDetails(user: UserDocument): UserDetails {
    return {
      id: user._id,
      firstname: user.firstname,
      lastname: user.lastname,
      username: user.username,
      email: user.email,
      favouriteRestaurants: user.favouriteRestaurants,
      token: user.token,
    };
  }

  async addToken(
    id: string,
    token: string,
  ): Promise<HttpStatus | HttpException> {
    let user = await this.userModel.findOne({ id: id }).exec();
    if(!user) new HttpException('Keinen User gefunden', HttpStatus.NOT_FOUND)
    this.userModel
      .updateOne(
        { _id: id },
        { $set: { token: token } },
      )
      .exec();
    return HttpStatus.OK
  }

  async findByToken(token: string): Promise<UserDetails | null> {
    const user = await this.userModel.findOne({token: token})
    .exec();
    if (!user) return null;
    return this._getUserDetails(user);
  }

  async findFavouriteRestaurants(token: string): Promise<{favouriteRestaurants: [Restaurant]} | null> {
    const user = await this.userModel
      .findOne({token: token})
      .exec();
    if (!user) return null;
    console.log(user);
    
    return this.getFavouriteRestaurants(user);
  }
  getFavouriteRestaurants(user: UserDocument): {favouriteRestaurants: [Restaurant]} {
    return {
      favouriteRestaurants: user.favouriteRestaurants
    };
  }

  async findByMail(email: string): Promise<UserDocument | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(
    firstname: string,
    lastname: string,
    username: string,
    email: string,
    hashedPassword: string,
  ): Promise<UserDocument> {
    const newUser = new this.userModel({
      firstname,
      lastname,
      email,
      username,
      password: hashedPassword,
    });
    return newUser.save();
  }

  async AddFvouriteRestaurant(
    restaurantName: String,
    username: String,
  ): Promise<HttpStatus | HttpException> {
    const restaurant = await this.restaurantModel
      .findOne({ restaurantName: restaurantName })
      .exec();
    console.log(restaurant
      );
    
    if(!restaurant) return new HttpException("des scheiß Restaurant gibts ned oida" , HttpStatus.NOT_FOUND)

    let user = await this.userModel.findOne({ username: username }).exec();

    let favouriteRestaurants = await this._getUserDetails(user)
      .favouriteRestaurants;

    favouriteRestaurants.push(restaurant);

    this.userModel
      .updateOne(
        { username: username },
        { $set: { favouriteRestaurants: favouriteRestaurants } },
      )
      .exec();

    return HttpStatus.OK;
  }
}
