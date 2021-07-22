import { prop } from '@typegoose/typegoose';
import { generateUuid } from '../helpers';

export class Entity {
  @prop({
    unique: true,
    required: true,
    index: true,
  })
  public id!: string;

  @prop({
    required: true,
  })
  public updatedAt!: Date;

  @prop({
    required: true,
  })
  public createdAt!: Date;

  constructor(entity: { updatedAt?: Date; createdAt?: Date; id?: string }) {
    this.id = entity.id ?? generateUuid();
    this.updatedAt = entity.updatedAt ?? new Date();
    this.createdAt = entity.createdAt ?? new Date();
  }
}
