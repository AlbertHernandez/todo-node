import { TodoFilter, TodosRepository as ITodosRepository } from './interfaces';
import { MongoError } from '../../server/modules/mongo/constants';
import { DuplicateTodoError } from './errors';
import { Todo, todoModel } from './entities';
import { CreateTodoDto } from './dto';

export class TodosRepository implements ITodosRepository {
  private readonly todoModel;

  constructor(dependencies: { todoModel: todoModel }) {
    this.todoModel = dependencies.todoModel;
  }

  async get(filter: TodoFilter = {}): Promise<Todo[]> {
    const rawMatchedTodos = await this.todoModel.find(filter as any, null, {
      lean: true,
    });

    return rawMatchedTodos.length > 0
      ? rawMatchedTodos.map((rawMatchedTodo) => this.mapToTodo(rawMatchedTodo))
      : [];
  }

  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    try {
      const todo = new Todo(createTodoDto);
      await this.todoModel.create(todo);
      return todo;
    } catch (error) {
      if (error.message.includes(MongoError.Duplicate) === true) {
        throw new DuplicateTodoError('Duplicated todo', {
          createTodoDto,
          duplicateKey: error.keyValue,
        });
      }
      throw error;
    }
  }

  async remove(id: string): Promise<void> {
    await this.todoModel.deleteOne({
      id,
    });
  }

  async removeAll(): Promise<void> {
    await this.todoModel.deleteMany({});
  }

  private mapToTodo(rawTodo: any): Todo {
    return new Todo(rawTodo);
  }
}
