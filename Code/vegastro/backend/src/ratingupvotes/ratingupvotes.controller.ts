import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, Put } from '@nestjs/common';
import {RatingupvoteService } from './ratingupvotes.service';
import { RatingupvotesDocument } from 'src/schema/ratingupvotes.schema';
import { CreateRatingUpvoteDto } from './dto/create-ratingupvotes.dto';

@Controller('ratingupvotes')
export class RatingupvoteController {
  constructor(private readonly ratingupvoteService: RatingupvoteService) { }

  @Get('getByUser/:userToken')
  findbyToken(@Param('userToken') token: string): Promise<RatingupvotesDocument[] | HttpException> {
    return this.ratingupvoteService.getByUser(token);
  }

  @Post('create')
  create(@Body() upvote: CreateRatingUpvoteDto): Promise<RatingupvotesDocument | HttpException> {
    return this.ratingupvoteService.create(upvote);
  }
  
  @Put('delete')
  delete(@Body() upvote: CreateRatingUpvoteDto): Promise<RatingupvotesDocument | HttpException> {
    return this.ratingupvoteService.delete(upvote);
  }

  @Get('getSumVotes/:ratingId')
  getSum(@Param('ratingId') ratingId: string): Promise<any | HttpException> {
    return this.ratingupvoteService.getSum(ratingId);
  }
  
  
}
