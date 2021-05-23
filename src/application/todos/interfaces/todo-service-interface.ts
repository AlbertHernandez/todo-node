import { DeleteTodoMethod } from './delete-todo-method-interface';
import { CreateTodoMethod } from './create-todo-method-interface';
import { GetTodosMethod } from './get-todos-method-interface';
import { DeleteAllTodosMethod } from './delete-all-todos-method-interface';

export interface TodosService {
  get: GetTodosMethod;
  create: CreateTodoMethod;
  remove: DeleteTodoMethod;
  removeAll: DeleteAllTodosMethod;
}
