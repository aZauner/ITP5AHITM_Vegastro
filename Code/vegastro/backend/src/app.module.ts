import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { RestaurantModule } from './restaurant/restaurant.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://vegastro:vegastro@cluster0.00htsk8.mongodb.net/?retryWrites=true&w=majority'
    ),
    UserModule,
    AuthModule,
    RestaurantModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
