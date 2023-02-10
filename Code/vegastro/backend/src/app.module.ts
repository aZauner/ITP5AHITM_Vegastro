import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';
import { MealModule } from './meal/meal.module';
import { RatingModule } from './rating/rating.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vegastro:vegastro@cluster0.00htsk8.mongodb.net/?retryWrites=true&w=majority'
    ),
    UserModule,
    AuthModule,
    RestaurantModule,
    MealModule,
    RatingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
