import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Meal, MealDocument } from 'src/schema/meal.schema';
import { Rating, RatingDocument } from 'src/schema/rating.schema';
import { Restaurant, RestaurantDocument } from 'src/schema/restaurant.schema';
import { User, UserDocument } from 'src/schema/user.schema';

import { RatingupvotesDetail } from './entities/rating.entity';
import { Ratingupvotes, RatingupvotesDocument } from 'src/schema/ratingupvotes.schema';
import { CreateRatingUpvoteDto } from './dto/create-ratingupvotes.dto';


@Injectable()
export class RatingupvoteService {
  
  
  constructor(
    @InjectModel(Ratingupvotes.name)
    private readonly ratingUpvotesModel: Model<RatingupvotesDocument>,
    
    ) { }  
    
   

    _getVoteDetails(voting: RatingupvotesDocument): RatingupvotesDetail {
      return {        
        id: voting._id,
        userToken: voting.userToken,
        ratingId: voting.ratingId
      };
    }

    async getSum(ratingId: string): Promise<any | HttpException> {
      return await this.ratingUpvotesModel
      .find(  { ratingId: ratingId }).count().exec() 

    }
   
    async getByUser(token: string): Promise<RatingupvotesDocument[]|HttpException> {
      console.log(token);
      
      const ratingupVotes = await this.ratingUpvotesModel
        .find({ userToken: token })
        .exec();
      if (!ratingupVotes)
        return new HttpException(
          'keine Restaurants gefunden',
          HttpStatus.NOT_FOUND,
        );

        console.log(ratingupVotes);
          
      let ratingupVotesArray = [];
      for (const vote of ratingupVotes) {
        ratingupVotesArray.push(this._getVoteDetails(vote));  
      }
      return ratingupVotesArray;
    }


    async delete(upvote: CreateRatingUpvoteDto): Promise<RatingupvotesDocument | HttpException> {
      await this.ratingUpvotesModel.deleteOne({ $and : [{userToken: upvote.userToken} , {ratingId: upvote.ratingId}] }).exec()
      return new HttpException(
        'gelöscht',
        HttpStatus.ACCEPTED,
      );
    }  
    

    async create(upvote: CreateRatingUpvoteDto): Promise<RatingupvotesDocument | HttpException> {
          const ratingupVotes = await this.ratingUpvotesModel
          .find({ $and : [{userToken: upvote.userToken} , {ratingId: upvote.ratingId}] })
          .exec();

          if(ratingupVotes.length > 0 ){       
            
            return new HttpException(
              'Gibt es schon',
              HttpStatus.NOT_FOUND,
            );
          }else{
            const newUpvote = new this.ratingUpvotesModel(upvote);
            return newUpvote.save()

          }
      } 
  }
  