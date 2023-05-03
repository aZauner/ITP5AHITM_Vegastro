import { Module } from '@nestjs/common';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ApiImage, ApiImageSchema } from './image.model/image.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [ImageController],
  providers: [ImageService],
  imports: [
    MongooseModule.forFeature([{
      name: ApiImage.name,
      schema: ApiImageSchema
    }])
  ]
})
export class ImageModule { }