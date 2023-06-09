import config from '../../config/index'
import { IUser } from './user.interface'
import { User } from './user.model'
import { getUserId } from './user.utils'
const createUser = async (user: IUser): Promise<IUser> => {
  const id = await getUserId()
  user.id = id
  if (!user.password) user.password = config.user_default_password as string
  const createUser = await User.create(user)

  if (!createUser) throw new Error('Faild to create user')
  return createUser
}
export default {
  createUser,
}
