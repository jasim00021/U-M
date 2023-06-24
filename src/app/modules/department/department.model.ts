import { Schema, model } from 'mongoose';
import { IDepartment, DepartmentModel } from './department.interface';

const departmentSchema = new Schema<IDepartment>(
  {
    title: {
      type: String,
      require: true,
      unique: true,
    },
    academicFaculty: {
      type: Schema.Types.ObjectId,
      ref: 'AcademicFaculty',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);
export const Department = model<IDepartment, DepartmentModel>(
  'Department',
  departmentSchema
);
