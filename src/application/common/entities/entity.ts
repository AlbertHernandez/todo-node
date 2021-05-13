import { Exclude } from 'class-transformer'
import { prop } from '@typegoose/typegoose'
import { generateUuid } from '@application/common/helpers'

export class Entity {
  @Exclude()
  public readonly _id?: string

  @Exclude()
  public readonly __v?: number

  @prop({
    unique: true,
    required: true,
    index: true,
    default: () => generateUuid()
  })
  public id!: string

  @prop({ default: Date.now })
  public updatedAt!: Date

  @prop({ default: Date.now })
  public createdAt!: Date
}
