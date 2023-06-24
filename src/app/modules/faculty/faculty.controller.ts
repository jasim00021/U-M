import { RequestHandler } from 'express';
import { sendResponse } from '../../../shared/sendResponse';
import httpStatus from 'http-status';

import pic from '../../../shared/pick';
import { paginationFields } from '../../../constant/pagination';
import { IGenericResponse } from '../../interfaces/common';
import { catchAsync } from '../../../shared/catchAsync';
import { FacultyService } from './faculty.service';
import { IAcademicFacultySearch, IAcademicFaculty } from './faculty.interface';
import { SearchTerm } from './faculty.constant';

const createFaculty = catchAsync(async (req, res, next) => {
  const faculty = req.body;
  const result = await FacultyService.createFaculty(faculty);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty  created successfully',
    data: result,
  });
});

const getAllFaculty = catchAsync(async (req, res, next) => {
  const paginationOption = pic(req.query, paginationFields);
  const filter = pic(req.query, SearchTerm);
  const result = await FacultyService.getAllFaculty(filter, paginationOption);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty  Data was successfully retrieved',
    data: result.data,
    meta: result.meta,
  });
});
const getSingleFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await FacultyService.getSingleFaculty(id);
  sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty  Data was successfully retrieved',
    data: result,
  });
});
const updateFaculty = catchAsync(async (req, res, next) => {
  const { ...academicSemisterData } = req.body;
  const { id } = req.params;
  const result = await FacultyService.updateFaculty(id, academicSemisterData);

  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty  updated successfully',
    data: result,
  });
});

const deleteFaculty = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const result = await FacultyService.deleteFaculty(id);
  return sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty deleted successfully',
    data: result,
  });
});

export const FacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
