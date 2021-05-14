import {
  TodoFilter,
  TodosRepository as ITodosRepository
} from './interfaces'
import { MongoError } from '@modules/mongo/constants'
import { DuplicateTodoError } from './errors'
import { Todo, todoModel } from './entities'
import { plainToClass } from 'class-transformer'
import { CreateTodoDto } from './dto'

export class TodosRepository implements ITodosRepository {
  private readonly todoModel

  constructor (dependencies: { todoModel: todoModel }) {
    this.todoModel = dependencies.todoModel
  }

  async get (filter: TodoFilter = {}): Promise<Todo[]> {
    const rawMatchedTodos = await this.todoModel.find(filter as any, null, {
      lean: true
    })

    return (rawMatchedTodos.length > 0)
      ? rawMatchedTodos.map((rawMatchedTodo) => this.mapToTodo(rawMatchedTodo))
      : []
  }

  async create (createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todoToCreate = plainToClass(Todo, createTodoDto)
      const rawTodo = await this.todoModel.create(todoToCreate)
      const [createdTodo] = await this.get({ id: rawTodo.id })
      return createdTodo
    } catch (error) {
      if (error.message.includes(MongoError.Duplicate) === true) {
        throw new DuplicateTodoError('Duplicated todo', {
          createTodoDto,
          duplicateKey: error.keyValue
        })
      }
      throw error
    }
  }

  async remove (id: string): Promise<void> {
    await this.todoModel.deleteOne({
      id
    })
  }

  async removeAll (): Promise<void> {
    await this.todoModel.deleteMany({})
  }

  private mapToTodo (rawTodo: any): Todo {
    return plainToClass(Todo, rawTodo)
  }
}
