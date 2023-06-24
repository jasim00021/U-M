import { RequestHandler } from 'express';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import pic from '../../../shared/pick';
import { catchAsync } from '../../../shared/catchAsync';
import { DepartmentService } from './department.service';
import { IDepartment } from './department.interface';
import {
  academicDepartmentFilterableFields,
  academicDepartmentSearchableFields,
} from './department.constant';

const createDepartment = catchAsync(async (req, res, next) => {
  const Department = req.body;
  const result = await DepartmentService.createDepartment(Department);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department  created successfully',
    data: result,
  });
});

const getAllDepartment = catchAsync(async (req, res, next) => {
  const paginationOption = pic(req.query, academicDepartmentFilterableFields);
  const filter = pic(req.query, academicDepartmentSearchableFields);
  const result = await DepartmentService.getAllDepartment(
    filter,
    paginationOption
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department  Data was successfully retrieved',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleDepartment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await DepartmentService.getSingleDepartment(id);
  sendResponse<IDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department  Data was successfully retrieved',
    data: result,
  });
});
const updateDepartment = catchAsync(async (req, res, next) => {
  const { ...academicSemisterData } = req.body;
  const { id } = req.params;
  const result = await DepartmentService.updateDepartment(
    id,
    academicSemisterData
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department  updated successfully',
    data: result,
  });
});

const deleteDepartment = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await DepartmentService.deleteDepartment(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department deleted successfully',
    data: result,
  });
});

export const DepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
