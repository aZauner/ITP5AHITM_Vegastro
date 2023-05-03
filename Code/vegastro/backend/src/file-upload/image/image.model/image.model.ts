import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class ApiImage {
    @Prop({ required: true })
    name: string;

    @Prop({type: Object, default: {data: null, contentType: null}})
    image_file: { data: Buffer, contentType: string }

    @Prop({ default: Date.now() })
    createdAt: Date;

    url: string;
}

export type ApiImageDocument = ApiImage & Document;
export const ApiImageSchema = SchemaFactory.createForClass(ApiImage)