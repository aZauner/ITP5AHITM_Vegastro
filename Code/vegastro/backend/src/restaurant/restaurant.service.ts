import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from 'src/schema/restaurant.schema';
import { User, UserDocument } from '../schema/user.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDetails } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(@InjectModel(Restaurant.name) private readonly restaurantModel: Model <RestaurantDocument> ) {}
  
  _getRestaurantDetails(restaurant: RestaurantDocument): RestaurantDetails{
    return {
      id: restaurant._id,
      restaurantName: restaurant.restaurantName,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude
    };  
  }

  async findByName(name: string): Promise<RestaurantDetails | null> {
    const restaurant = await this.restaurantModel.findOne({restaurantName: name}).exec();
    if (!restaurant) return null;
    return this._getRestaurantDetails(restaurant);
  }

  async create(restaurant: CreateRestaurantDto): Promise<RestaurantDocument>{
    const newRestaurant = new this.restaurantModel(restaurant);
    return newRestaurant.save();
  }
}