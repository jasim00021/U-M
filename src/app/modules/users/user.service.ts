import ApiError from '../../../errors/ApiError';
import config from '../../config/index';
import { IUser } from './user.interface';
import { User } from './user.model';
import { getStudentId } from './user.utils';
const createUser = async (user: IUser): Promise<IUser> => {
  const academicsemister = {
    year: '2024',
    code: '02',
  };
  const id = await getStudentId(academicsemister);
  user.id = id;
  if (!user.password) user.password = config.user_default_password as string;
  const createUser = await User.create(user);

  if (!createUser) throw new ApiError(4000, 'Faild to create user');
  return createUser;
};
export const UserService = {
  createUser,
};
