import express from 'express';
import { DepartmentController } from './department.controller';
import validateRequest from '../../middleware/RequestValidation';
import { DepartmentRequestValidation } from './department.validRequest';

const router = express.Router();

router.post(
  '/create-department',
  validateRequest(DepartmentRequestValidation.createDepartmentZodSchema),
  DepartmentController.createDepartment
);
router.patch(
  '/:id',
  validateRequest(DepartmentRequestValidation.updateDepartmentZodSchema),
  DepartmentController.updateDepartment
);
router.get('/:id', DepartmentController.getSingleDepartment);

router.delete('/:id', DepartmentController.deleteDepartment);

router.get('/', DepartmentController.getAllDepartment);

export const DepartmentRouter = router;
