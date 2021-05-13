import {
  TodoFilter,
  TodosRepository as ITodosRepository
} from './interfaces'
import { MongoError } from '@modules/mongo/constants'
import { DuplicateTodoError } from './errors'
import { Todo, todoModel } from './entities'

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

  async create (todo: Todo): Promise<Todo> {
    try {
      const rawTodo = await this.todoModel.create(todo)
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
    await this.todoModel.deleteOne({
      id
    })
  }

  async removeAll (): Promise<void> {
    await this.todoModel.deleteMany({})
  }

  private mapToTodo (rawTodo: any): Todo {
    return {
      id: rawTodo.id,
      author: rawTodo.author,
      title: rawTodo.title,
      content: rawTodo.content,
      isCompleted: rawTodo.isCompleted,
      updatedAt: rawTodo.updatedAt,
      createdAt: rawTodo.createdAt
    }
  }
}
