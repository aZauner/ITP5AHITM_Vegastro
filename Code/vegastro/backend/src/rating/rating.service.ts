import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal, MealDocument } from 'src/schema/meal.schema';
import { Rating, RatingDocument } from 'src/schema/rating.schema';
import { Restaurant, RestaurantDocument } from 'src/schema/restaurant.schema';
import { User, UserDocument } from 'src/schema/user.schema';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingDetails } from './entities/rating.entity';


@Injectable()
export class RatingService {  
  constructor(
    @InjectModel(Rating.name)
    private readonly ratingModel: Model<RatingDocument>,
    
    ) { }  
    
    _getRatingDetails(rating: RatingDocument): RatingDetails {
      return {
        id: rating._id,
        userToken: rating.userToken,
        restaurant: rating.restaurant,
        stars: rating.stars,
        comment: rating.comment,
        date: rating.date
      };
    }

    async updateRating(input: { id: string; comment: string; rating: number; }): Promise<any> {
      this.ratingModel
      .updateOne({ _id: input.id }, { $set: { comment: input.comment , stars: input.rating , date: new Date()} })
      .exec();
    }
    
    async findRatings(userToken: string): Promise<HttpException | RatingDetails[]> {
      
      const ratings = await this.ratingModel
      .find({ userToken: userToken })
      .exec();
      if(!ratings) return new HttpException('Keine Ratings gefunden' , HttpStatus.NOT_FOUND)
      let res = [];
      for (const rating of ratings) {
        res.push(this._getRatingDetails(rating))
      }
      
      return res;
    }
    
    async create(rating: CreateRatingDto): Promise<HttpException | RatingDocument> {   
      rating.date = new Date()       
      const newRating = new this.ratingModel(rating);
      return newRating.save()
    }

    async findRatingsByRestaurant(restaurantId: string): Promise<HttpException | RatingDetails[]> {
      const ratings = await this.ratingModel
      .find({ restaurant: restaurantId })
      .exec();
      
      if(!ratings) return new HttpException('Keine Ratings gefunden' , HttpStatus.NOT_FOUND)
      let res = [];
      for (const rating of ratings) {
        res.push(this._getRatingDetails(rating))
      }
      
      return res;
    }
    
  }
  