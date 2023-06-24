import express from 'express';
import validateRequest from '../../middleware/RequestValidation';
import { AcademicSemisterRequestValidation } from './academicSemister.validation';
import { AcademicSemisterController } from './academicSemister.controllr';
const router = express.Router();

router.post(
  '/create-semister',
  validateRequest(
    AcademicSemisterRequestValidation.createAcademicSemisterZodSchema
  ),
  AcademicSemisterController.createAcademicSemister
);
router.patch(
  '/:id',
  validateRequest(
    AcademicSemisterRequestValidation.updateAcademicSemisterZodSchema
  ),
  AcademicSemisterController.updateSemister
);
router.get('/:id', AcademicSemisterController.getSingleSemister);

router.delete('/:id', AcademicSemisterController.deleteSemister);

router.get('/', AcademicSemisterController.getAllSemister);

export const AcademicRouter = router;
