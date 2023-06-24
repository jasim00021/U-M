import { Schema, model } from 'mongoose';

import { AcademicFacultyModel, IAcademicFaculty } from './faculty.interface';

const facultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      require: true,
      type: String,
    },
  },
  { timestamps: true }
);

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  facultySchema
);
