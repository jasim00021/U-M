import { Model, ObjectId, Schema } from 'mongoose';

export type IDepartment = {
  title: string;
  academicFaculty: ObjectId | Schema.Types.ObjectId;
};

export type DepartmentModel = Model<IDepartment>;

export type IDepartmentSearch = {
  searchTerm: string;
};
