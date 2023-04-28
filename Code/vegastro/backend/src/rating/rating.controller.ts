import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import { Rating, RatingDocument } from 'src/schema/rating.schema';
import { CreateRatingDto } from './dto/create-rating.dto';
import { RatingDetails } from './entities/rating.entity';
import { RatingService } from './rating.service';

@Controller('rating')
export class RatingController {
  constructor(private readonly ratingService: RatingService) { }

  @Get(':userToken')
  findRatings(@Param('userToken') userToken: string): Promise<RatingDetails[] | HttpException> {
    return this.ratingService.findRatings(userToken);
  }

  @Get('byRestaurant/:restaurantId')
  findRatingsByRestaurant(@Param('restaurantId') restaurantId: string): Promise<RatingDetails[] | HttpException> {
    return this.ratingService.findRatingsByRestaurant(restaurantId);
  }

  @Post('create')
  create(@Body() rating: CreateRatingDto): Promise<RatingDocument | HttpException> {   
    return this.ratingService.create(rating);
  }

  @Put('updateRating')
  updateRating(@Body() input : {id: string, comment: string, rating: number}): Promise<any> {   
    return this.ratingService.updateRating(input);
  }
}
