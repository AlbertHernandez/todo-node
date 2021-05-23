import { DeleteAllTodosMethod } from './delete-all-todos-method-interface';
import { DeleteTodoMethod } from './delete-todo-method-interface';
import { CreateTodoMethod } from './create-todo-method-interface';
import { GetTodosMethod } from './get-todos-method-interface';

export interface TodosRepository {
  get: GetTodosMethod;
  create: CreateTodoMethod;
  remove: DeleteTodoMethod;
  removeAll: DeleteAllTodosMethod;
}
