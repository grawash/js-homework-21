import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({timestamps: true})
export class User {

    @Prop({type: String})
    name: string
    @Prop({type: String, unique: true})
    email: string
} 

export const UserSchema = SchemaFactory.createForClass(User)