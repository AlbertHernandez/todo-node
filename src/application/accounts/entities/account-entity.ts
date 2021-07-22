import * as mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Entity } from 'src/application/common/entities/entity';

export class Account extends Entity {
  @prop({ required: true })
  public name!: string;

  @prop({ unique: true, required: true, index: true })
  public email!: string;

  constructor(account: {
    id?: string;
    name: string;
    email: string;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    super(account);

    this.name = account.name;
    this.email = account.email;
  }
}

export const AccountModel = getModelForClass(Account);

export type AccountDocument = Account & mongoose.Document;

export type accountModel = mongoose.Model<AccountDocument>;
