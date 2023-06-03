import mongoose from 'mongoose'
import app from './app/app'
import config from './app/config/index'

async function DbConnect() {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(`Database connected...`)
    app.listen(config.port, () => {
      console.log(`Application listening on port ${config.port}`)
    })
  } catch (error) {
    console.log(`Database connection error: ${error}`)
  }
}
DbConnect()
