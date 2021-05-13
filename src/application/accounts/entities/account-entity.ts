import * as mongoose from 'mongoose'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { generateUuid } from '@application/common/helpers'
import { Model } from 'mongoose'

export class Account {
  @prop({
    unique: true,
    required: true,
    index: true,
    default: () => generateUuid()
  })
  public id!: string

  @prop({ required: true })
  public name!: string

  @prop({ unique: true, required: true, index: true })
  public email!: string

  @prop({ default: Date.now })
  public updatedAt!: Date

  @prop({ default: Date.now })
  public createdAt!: Date
}

export const AccountModel = getModelForClass(Account)

export type AccountDocument = Account & mongoose.Document

export type accountModel = Model<AccountDocument>
