import { RequestHandler } from 'express'
import { UserService } from './user.service'
const createUser: RequestHandler = async (req, res, next) => {
  try {
    const { user } = req.body
    const result = await UserService.createUser(user)
    return res.status(200).json({
      success: true,
      message: 'User created successfully',
      data: result,
    })
  } catch (error) {
    console.log('error', error)

    next(error)
  }
}
export const UserController = {
  createUser,
}
