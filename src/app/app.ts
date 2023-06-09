import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './modules/users/user.routes'
const app: Application = express()

app.use(cors())
app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!')
})
// user Router
app.use('/api/v1/user', userRouter)

export default app
