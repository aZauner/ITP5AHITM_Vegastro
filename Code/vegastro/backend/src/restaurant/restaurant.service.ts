import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from 'src/schema/restaurant.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDetails } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
  ) {}

  async findRestaurantsNearPosion(
    northLat: number,
    northLon: number,
    southLat: number,
    southLon: number,
  ): Promise<RestaurantDetails[] | HttpException> {
    let restaurants = await this.restaurantModel
      .find({
        latitude: { $lt: northLat, $gt: southLat },
        longitude: { $lt: northLon, $gt: southLon },
      })
      .exec();

    if (restaurants.length == 0) {
      return new HttpException(
        'Keine Restaurants gefunden',
        HttpStatus.NOT_FOUND,
      );
    }
    let rest: RestaurantDetails[] = [];

    if (restaurants.length <= 20) {
      restaurants.forEach((element) => {
        rest.push(this._getRestaurantDetails(element));
      });
    }else{
      for (let i = 0; i < 20; i++) {
        rest.push(this._getRestaurantDetails(restaurants[Math.floor(Math.random() * restaurants.length)]));
      }
    }

    return rest;
  }

  _getRestaurantDetails(restaurant: RestaurantDocument): RestaurantDetails {
    return {
      id: restaurant._id,
      restaurantName: restaurant.restaurantName,
      latitude: restaurant.latitude,
      longitude: restaurant.longitude,
      // owner: restaurant.owner
    };
  }

  async findByName(name: string): Promise<RestaurantDetails | null> {
    const restaurant = await this.restaurantModel
      .findOne({ restaurantName: name })
      .exec();
    if (!restaurant) return null;
    return this._getRestaurantDetails(restaurant);
  }

  async create(restaurant: CreateRestaurantDto): Promise<RestaurantDocument> {
    const newRestaurant = new this.restaurantModel(restaurant);
    return newRestaurant.save();
  }
}
