import { env } from '@config/environment'
import { httpClientFactory } from '@modules/http-client'
import { loggerFactory } from '@modules/logger/logger-factory'
import { errorHandlerFactory } from '@modules/error-handler'
import { accountRecords, todoRecords } from './feeds'

const logger = loggerFactory.get({
  prettify: true,
  utcTimestamp: true,
  level: env.loggerLevel
})

const errorHandler = errorHandlerFactory.get({
  logger
})

const httpClient = httpClientFactory.get({
  baseUrl: `${env.todoAppApiUrl}/api/v1/`,
  headers: {
    'api-key': env.apiKey
  }
})

const feedAccounts = async (): Promise<void> => {
  logger.trace('Feed accounts...')

  logger.trace('Removing current accounts')
  await httpClient.delete('accounts')
  logger.trace('Removed accounts')

  logger.trace('Adding new accounts')
  await Promise.all(
    accountRecords.map(async (accountRecord) => {
      return await httpClient.post('accounts', accountRecord)
    })
  )
  logger.trace('New accounts added!')

  logger.trace('Feed accounts completed!')
}

const feedTodos = async (): Promise<void> => {
  logger.trace('Feed todos...')

  logger.trace('Removing current todos')
  await httpClient.delete('todos')
  logger.trace('Removed todos')

  logger.trace('Adding new todos')
  await Promise.all(
    todoRecords.map(async (todoRecord) => {
      return await httpClient.post('todos', todoRecord)
    })
  )
  logger.trace('New todos added!')

  logger.trace('Feed todos completed!')
}

const index = async (): Promise<void> => {
  logger.info('Starting to feed the database')

  try {
    await feedAccounts()
    await feedTodos()

    logger.info('Feed database ends with success!')
  } catch (error) {
    await errorHandler.handleError(error)
  }
}

// eslint-disable-next-line no-void
void index()
