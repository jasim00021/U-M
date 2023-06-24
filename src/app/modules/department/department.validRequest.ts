import { z } from 'zod';

const createDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title required',
    }),
    academicFaculty: z.string({
      required_error: 'academicFaculty required',
    }),
  }),
});
const updateDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'title required',
      })
      .optional(),
    academicFaculty: z
      .string({
        required_error: 'academicFaculty required',
      })
      .optional(),
  }),
});

export const DepartmentRequestValidation = {
  createDepartmentZodSchema,
  updateDepartmentZodSchema,
};
