import * as mongoose from 'mongoose'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { Model } from 'mongoose'
import { Entity } from '@application/common/entities/entity'

export class Account extends Entity {
  @prop({ required: true })
  public name!: string

  @prop({ unique: true, required: true, index: true })
  public email!: string
}

export const AccountModel = getModelForClass(Account)

export type AccountDocument = Account & mongoose.Document

export type accountModel = Model<AccountDocument>
