import * as mongoose from 'mongoose';
import { prop, getModelForClass } from '@typegoose/typegoose';
import { Model } from 'mongoose';
import { Entity } from '@application/common/entities/entity';

export class Todo extends Entity {
  @prop({ required: true })
  public author!: string;

  @prop({ required: true })
  public title!: string;

  @prop()
  public content?: string;

  @prop({ required: true })
  public isCompleted!: boolean;

  constructor(todo: {
    id?: string;
    author: string;
    title: string;
    content?: string;
    isCompleted?: boolean;
    updatedAt?: Date;
    createdAt?: Date;
  }) {
    super(todo);

    this.author = todo.author;
    this.title = todo.title;
    this.content = todo.content;
    this.isCompleted = todo.isCompleted ?? false;
  }
}

export const TodoModel = getModelForClass(Todo);

export type TodoDocument = Todo & mongoose.Document;

export type todoModel = Model<TodoDocument>;
