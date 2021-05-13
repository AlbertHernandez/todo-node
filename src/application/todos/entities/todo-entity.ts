import * as mongoose from 'mongoose'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { generateUuid } from '@application/common/helpers'
import { Model } from 'mongoose'

export class Todo {
  @prop({
    unique: true,
    required: true,
    index: true,
    default: () => generateUuid()
  })
  public id!: string

  @prop({ required: true })
  public author!: string

  @prop({ required: true })
  public title!: string

  @prop()
  public content?: string

  @prop({ default: false })
  public isCompleted!: string

  @prop({ default: Date.now })
  public updatedAt!: Date

  @prop({ default: Date.now })
  public createdAt!: Date
}

export const TodoModel = getModelForClass(Todo)

export type TodoDocument = Todo & mongoose.Document

export type todoModel = Model<TodoDocument>
