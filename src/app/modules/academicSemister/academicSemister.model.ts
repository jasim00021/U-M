import { Schema, model } from 'mongoose'
import {
  IAcademicSemister,
  AcademicSemisterMOdel,
} from './academicSemister.interface'
import { number } from 'zod'

const academicSemisterSchema = new Schema<IAcademicSemister>(
  {
    title: { type: String, required: true },
    year: { type: number, required: true },
    code: { type: String, required: true },
    startMonth: { type: String, required: true },
    endMonth: { type: String, required: true },
  },
  { timestamps: true }
)

export const AcademicSemister = model<IAcademicSemister, AcademicSemisterMOdel>(
  'AcademicSemister',
  academicSemisterSchema
)
