import { Schema, model } from 'mongoose';
import {
  IAcademicSemister,
  AcademicSemisterMOdel,
} from './academicSemister.interface';
import { number } from 'zod';
import {
  AcademicCode,
  AcademicMonth,
  AcademicTitle,
} from './academicSemister.common';

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: { type: String, required: true, enum: AcademicTitle },
    year: { type: Number, required: true },
    code: { type: String, required: true, enum: AcademicCode },
    startMonth: { type: String, required: true, enum: AcademicMonth },
    endMonth: { type: String, required: true, enum: AcademicMonth },
  },
  { timestamps: true }
);

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterMOdel>(
  'AcademicSemister',
  academicSemisterSchema
);
