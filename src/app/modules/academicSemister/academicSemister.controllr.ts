import { RequestHandler } from 'express';
import { AcademicSemisterService } from './academicSemister.service';
import { catchAsync } from '../../../shared/catchAsync';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import {
  IAcademicSemister,
  IAcademicSemisterPagination,
} from './academicSemister.interface';
import pic from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { IGenericResponse } from '../../interfaces/common';
const createAcademicSemister = catchAsync(async (req, res, next) => {
  const { ...academicSemisterData } = req.body;
  const result = await AcademicSemisterService.createSemister(
    academicSemisterData
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister  created successfully',
    data: result,
  });
  next();
});

const getAllSemister = catchAsync(async (req, res, next) => {
  const paginationOption = pic(req.query, paginationFields);
  const filter = pic(req.query, ['searchTerm', 'title', 'code', 'year']);
  console.log('filter', filter);
  const result = await AcademicSemisterService.getAppAcademicSemister(
    filter,
    paginationOption
  );
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister  Data was successfully retrieved',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleSemister = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await AcademicSemisterService.getSingleSemister(id);
  sendResponse<IAcademicSemister>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister  Data was successfully retrieved',
    data: result,
  });
});
const updateSemister = catchAsync(async (req, res, next) => {
  const { ...academicSemisterData } = req.body;
  const { id } = req.params;
  const result = await AcademicSemisterService.updateSemister(
    id,
    academicSemisterData
  );

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister  updated successfully',
    data: result,
  });
});

const deleteSemister = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await AcademicSemisterService.deleteSemister(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'AcademicSemister deleted successfully',
    data: result,
  });
});

export const AcademicSemisterController = {
  createAcademicSemister,
  getAllSemister,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};
