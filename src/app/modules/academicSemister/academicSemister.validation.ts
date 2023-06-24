import { z } from 'zod';
import {
  AcademicCode,
  AcademicMonth,
  AcademicTitle,
} from './academicSemister.common';

const createAcademicSemisterZodSchema = z.object({
  body: z.object({
    title: z.enum([...AcademicTitle] as [string, ...string[]], {
      required_error: 'Title is required',
    }),
    year: z.string({
      required_error: 'Year required',
    }),

    code: z.enum([...AcademicCode] as [string, ...string[]], {
      required_error: 'code required',
    }),
    startMonth: z.enum([...AcademicMonth] as [string, ...string[]], {
      required_error: 'startMonth required',
    }),
    endMonth: z.enum([...AcademicMonth] as [string, ...string[]], {
      required_error: 'endMonth required',
    }),
  }),
});
const updateAcademicSemisterZodSchema = z.object({
  body: z
    .object({
      title: z
        .enum([...AcademicTitle] as [string, ...string[]], {
          required_error: 'Title is required',
        })
        .optional(),
      year: z
        .string({
          required_error: 'Year required',
        })
        .optional(),

      code: z
        .enum([...AcademicCode] as [string, ...string[]], {
          required_error: 'code required',
        })
        .optional(),
      startMonth: z
        .enum([...AcademicMonth] as [string, ...string[]], {
          required_error: 'startMonth required',
        })
        .optional(),
      endMonth: z
        .enum([...AcademicMonth] as [string, ...string[]], {
          required_error: 'endMonth required',
        })
        .optional(),
    })
    .refine(data => (data.title && data.code) || (!data.title && !data.code), {
      message: 'Either both title and code should be provided or neither',
    }),
});
export const AcademicSemisterRequestValidation = {
  createAcademicSemisterZodSchema,
  updateAcademicSemisterZodSchema,
};
