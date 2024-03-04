import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { TKeyRole } from '../../common/decorators/roles/role'

export type UserDocument = HydratedDocument<User>

@Schema({ versionKey: false })
export class User {
  @Prop({ required: true, unique: true })
  email: string

  @Prop({ required: true })
  hashPassword: string

  @Prop({ required: true })
  login: string

  @Prop({ required: true })
  phone: string

  @Prop({ required: true })
  role: TKeyRole
}

export const UserSchema = SchemaFactory.createForClass(User)
