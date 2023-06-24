import express from 'express';
import validateRequest from '../../middleware/RequestValidation';
import { FacultyRequestValidation } from './faculty.requestvalidation';
import { FacultyController } from './faculty.controller';

const router = express.Router();

router.post(
  '/create-faculty',
  validateRequest(FacultyRequestValidation.createFacultyZodSchema),
  FacultyController.createFaculty
);
router.patch(
  '/:id',
  validateRequest(FacultyRequestValidation.updateFacultyZodSchema),
  FacultyController.updateFaculty
);
router.get('/:id', FacultyController.getSingleFaculty);

router.delete('/:id', FacultyController.deleteFaculty);

router.get('/', FacultyController.getAllFaculty);

export const FacultyRouter = router;
