import { z } from 'zod';

const createFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title required',
    }),
  }),
});
const updateFacultyZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'title required',
    }),
  }),
});

export const FacultyRequestValidation = {
  createFacultyZodSchema,
  updateFacultyZodSchema,
};
