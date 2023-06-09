import mongoose from 'mongoose'
import app from './app/app'
import config from './app/config/index'
import { logger, errorlogger } from './shared/logger'
async function DbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    logger.info(`Database connected...`)
    app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    errorlogger.error(`Database connection error: ${error}`)
  }
}
DbConnect()
