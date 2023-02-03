import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Restaurant, RestaurantDocument } from 'src/schema/restaurant.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateRestaurantDto } from './dto/create-restaurant.dto';
import { RestaurantDetails } from './entities/restaurant.entity';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectModel(Restaurant.name)
    private readonly restaurantModel: Model<RestaurantDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>
  ) { }

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
    } else {
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
      owner: restaurant.owner,
      type: restaurant.type,
      description: restaurant.description
    };
  }

  async findByName(name: string): Promise<RestaurantDetails | null> {
    const restaurant = await this.restaurantModel
      .findOne({ restaurantName: name }).populate('owner', '', this.userModel)
      .exec();
    if (!restaurant) return null;
    return this._getRestaurantDetails(restaurant);
  }

  async create(restaurant: CreateRestaurantDto): Promise<RestaurantDocument | HttpException> {
    const owner = await this.userModel.findOne({ username: restaurant.owner }).exec();

    if (!owner) return new HttpException('Es existiert kein User mit diesem Username', HttpStatus.NOT_FOUND);

    restaurant.owner = owner;
    const newRestaurant = new this.restaurantModel(restaurant);
    return newRestaurant.save();
  }

  async getAllRstaurants(): Promise<HttpException | RestaurantDetails[]> {
    const restaurants = await this.restaurantModel
      .find()
      .exec();
    if (!restaurants) return new HttpException('keine Restaurants gefunden', HttpStatus.NOT_FOUND);

    let restaurnArry = [];
    for (const rest of restaurants) {
      restaurnArry.push(this._getRestaurantDetails(rest))
    }
    return restaurnArry;
  }
}
