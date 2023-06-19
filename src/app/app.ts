import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import globalErrorHandler from './middleware/globalErrorHandler'
import { UserRoutes } from './modules/users/user.routes'
import { errorlogger } from '../shared/logger'
const app: Application = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  // res.send('Hello World!')
  //   Promise.reject(new Error('Unhandled Promise Rejection'))
})
// user Router
app.use('/api/v1/user', UserRoutes)

// Global Error Handler

app.use(globalErrorHandler)

export default app
