import express from 'express'
import { UserController } from './user.controller'
import validateRequest from '../../middleware/RequestValidation'
import { createUserZodSchema } from './usesr.validation'
const router = express.Router()

router.post(
  '/create-user',
  validateRequest(createUserZodSchema),
  UserController.createUser
)

export const UserRoutes = router
