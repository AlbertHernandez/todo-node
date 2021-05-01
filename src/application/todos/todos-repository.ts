import {
  Todo,
  TodoFilter,
  TodoSchema,
  TodosRepository as ITodosRepository
} from './interfaces'
import { TodoDataModel } from './types'
import { generateUuid } from '../common/helpers'
import { MongoError } from '@modules/mongo/constants'
import { DuplicateTodoError } from './errors'

export class TodosRepository implements ITodosRepository {
  private readonly todoDataModel

  constructor (dependencies: { todoDataModel: TodoDataModel }) {
    this.todoDataModel = dependencies.todoDataModel
  }

  async get (filter: TodoFilter = {}): Promise<Todo[]> {
    const rawMatchedTodos = await this.todoDataModel.find(filter, null, {
      lean: true
    })

    return (rawMatchedTodos.length > 0)
      ? rawMatchedTodos.map((rawMatchedTodo) => this.mapToTodo(rawMatchedTodo))
      : []
  }

  async create (todo: Todo): Promise<Todo> {
    try {
      const rawTodo = await this.todoDataModel.create({
        ...todo,
        id: todo.id ?? generateUuid()
      })
      return this.mapToTodo(rawTodo)
    } catch (error) {
      if (error.message.includes(MongoError.Duplicate) === true) {
        throw new DuplicateTodoError('Duplicated todo', {
          todo,
          duplicateKey: error.keyValue
        })
      }
      throw error
    }
  }

  async remove (id: string): Promise<void> {
    await this.todoDataModel.deleteOne({
      id
    })
  }

  async removeAll (): Promise<void> {
    await this.todoDataModel.deleteMany()
  }

  private mapToTodo (rawTodo: TodoSchema): Todo {
    return {
      id: rawTodo.id,
      author: rawTodo.author,
      title: rawTodo.title,
      content: rawTodo.content,
      isCompleted: rawTodo.isCompleted
    }
  }
}
