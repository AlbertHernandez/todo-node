import { prop } from '@typegoose/typegoose'
import { generateUuid } from '@application/common/helpers'

export class Entity {
  @prop({
    unique: true,
    required: false,
    index: true
  })
  public id!: string

  @prop()
  public updatedAt!: Date

  @prop()
  public createdAt!: Date

  constructor (entity: {
    updatedAt?: Date
    createdAt?: Date
    id?: string
  }) {
    this.id = entity.id ?? generateUuid()
    this.updatedAt = entity.updatedAt ?? new Date()
    this.createdAt = entity.createdAt ?? new Date()
  }
}
