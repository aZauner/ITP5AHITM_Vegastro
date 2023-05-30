import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MealModule } from './meal/meal.module';
import { RatingModule } from './rating/rating.module';
import { ImageModule } from './file-upload/image/image.module';
import { RatingupvotesModule } from './ratingupvotes/ratingupvotes.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vegastro:vegastro@cluster0.00htsk8.mongodb.net/?retryWrites=true&w=majority'
    ),
    ImageModule,
    UserModule,
    AuthModule,
    RestaurantModule,
    MealModule,
    RatingModule,
    RatingupvotesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
