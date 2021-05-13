import * as mongoose from 'mongoose'
import { prop, getModelForClass } from '@typegoose/typegoose'
import { Model } from 'mongoose'
import { Entity } from '@application/common/entities/entity'

export class Todo extends Entity {
  @prop({ required: true })
  public author!: string

  @prop({ required: true })
  public title!: string

  @prop()
  public content?: string

  @prop({ default: false })
  public isCompleted!: string
}

export const TodoModel = getModelForClass(Todo)

export type TodoDocument = Todo & mongoose.Document

export type todoModel = Model<TodoDocument>
