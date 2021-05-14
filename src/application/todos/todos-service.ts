import { Logger } from '@modules/logger/interfaces'
import { AccountsService } from '../accounts/interfaces'
import { AccountNotFoundError } from '../errors'
import { CreateTodoDto } from './dto'
import { Todo } from './entities'
import {
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

  async create (createTodoDto: CreateTodoDto): Promise<Todo> {
    this.logger.trace({
      msg: 'Creating a todo...',
      context: { createTodoDto }
    })

    const account = await this.accountsService.get(createTodoDto.author)

    if (account == null) {
      this.logger.trace({
        msg: 'Not able to create the todo, account does not exist',
        context: { createTodoDto }
      })

      throw new AccountNotFoundError('Account not found', {
        email: createTodoDto.author
      })
    }

    this.logger.trace({
      msg: 'Account exists, storing the todo...',
      context: {
        account,
        createTodoDto
      }
    })

    const todo = await this.todosRepository.create(createTodoDto)

    this.logger.info({
      msg: 'Todo created successfully',
      context: {
        todo
      }
    })

    return todo
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
