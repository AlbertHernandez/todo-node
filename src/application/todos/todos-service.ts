import { Logger } from '../../server/modules/logger/interfaces'
import { AccountsService } from '../accounts/interfaces'
import { AccountNotFoundError } from '../errors'
import {
  Todo,
  TodoFilter,
  TodosRepository,
  TodosService as ITodosService
} from './interfaces'

export class TodosService implements ITodosService {
  private readonly todosRepository
  private readonly accountsService
  private readonly logger

  constructor (dependencies: {
    todosRepository: TodosRepository
    accountsService: AccountsService
    logger: Logger
  }) {
    this.todosRepository = dependencies.todosRepository
    this.accountsService = dependencies.accountsService
    this.logger = dependencies.logger
  }

  async get (filter?: TodoFilter): Promise<Todo[]> {
    return await this.todosRepository.get(filter)
  }

  async create (todo: Todo): Promise<Todo> {
    this.logger.trace({
      msg: 'Creating a todo...',
      context: todo
    })

    const account = await this.accountsService.get(todo.author)

    if (account == null) {
      this.logger.trace({
        msg: 'Not able to create the todo, account does not exist',
        context: todo
      })

      throw new AccountNotFoundError('Account not found', {
        email: todo.author
      })
    }

    this.logger.trace({
      msg: 'Account exists, storing the todo...',
      context: {
        account,
        todo
      }
    })

    const createdTodo = await this.todosRepository.create(todo)

    this.logger.info({
      msg: 'Todo created successfully',
      context: {
        createdTodo
      }
    })

    return createdTodo
  }

  async remove (id: string): Promise<void> {
    this.logger.trace({
      msg: 'Removing todo...',
      context: {
        id
      }
    })

    await this.todosRepository.remove(id)

    this.logger.trace({
      msg: 'Removed todo successfully',
      context: {
        id
      }
    })
  }

  async removeAll (): Promise<void> {
    this.logger.trace('Removing all todos...')

    await this.todosRepository.removeAll()

    this.logger.trace('Removed all todos successfully')
  }
}
