import { Model, Schema, Types } from 'mongoose';
import { IFaculty } from '../faculty/faculty.interface';

export type IUser = {
  id: string;
  role: string;
  password: string;
  student?: Types.ObjectId | IStudent;
  faculty?: Types.ObjectId | IFaculty;
  admin?: Types.ObjectId | IAdmin;
};
export type UserModel = Model<IUser, Record<string, unknown>>;

export type IAcademicSemisterYearAndCode = {
  code: string;
  year: string;
};
