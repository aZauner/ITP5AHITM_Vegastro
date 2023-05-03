import { Injectable } from '@nestjs/common';
import { ApiImage } from './image.model/image.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel(ApiImage.name) private readonly imageModel: Model<ApiImage>
    ) { }

    async create(file, createCatDto: { name: string, image_file: Buffer }) {
        const newImage = await new this.imageModel(createCatDto);
        
        newImage.image_file.data = file.buffer;
        newImage.image_file.contentType = file.mimetype;
        return newImage.save();
    }

    async findAll(): Promise<any> {
        return await this.imageModel.find({}, { image_file: 0 }).lean().exec();
    }

    async getById(id): Promise<any> {
        return await this.imageModel.findById(id).exec();
    }

    async removeImage(id): Promise<any> {
        return this.imageModel.findByIdAndDelete(id);
    }
}
