import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse, IPaginationOption } from '../../interfaces/common';
import { academicsemisterTitleCodeMapper } from './academicSemister.common';
import {
  IAcademicSemister,
  IAcademicSemisterFilter,
} from './academicSemister.interface';
import { AcademicSemister } from './academicSemister.model';
import status from 'http-status';

const createSemister = async (
  payload: IAcademicSemister
): Promise<IAcademicSemister> => {
  if (academicsemisterTitleCodeMapper[payload?.title] !== payload.code) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semister Code');
  }
  const result = await AcademicSemister.create(payload);
  return result;
};

const getAppAcademicSemister = async (
  filter: IAcademicSemisterFilter,
  pagination: IPaginationOption
): Promise<IGenericResponse<IAcademicSemister[]>> => {
  const { searchTerm, ...filterData } = filter;

  const academicSemisterSearchable = ['title', 'code', 'year'];
  const andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: academicSemisterSearchable.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }
  if (Object.keys(filterData).length) {
    andCondition.push({
      $and: Object.entries(filterData).map(([field, val]) => ({
        [field]: val,
      })),
    });
  }
  // const andCondition = [
  //   {
  //     $or: [
  //       {
  //         title: { $regex: searchTerm, $options: 'i' },
  //       },
  //       {
  //         code: { $regex: searchTerm, $options: 'i' },
  //       },
  //       {
  //         year: { $regex: searchTerm, $options: 'i' },
  //       },
  //     ],
  //   },
  // ];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};
  const result = await AcademicSemister.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  console.log('result', result);
  return {
    meta: {
      page,
      limit,
      total: await AcademicSemister.countDocuments(),
    },
    data: result,
  };
};

const getSingleSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findById(id);
  return result;
};

const updateSemister = async (
  id: string,
  payload: Partial<IAcademicSemister>
): Promise<IAcademicSemister | null> => {
  if (
    payload.code &&
    payload.title &&
    academicsemisterTitleCodeMapper[payload?.title] !== payload.code
  ) {
    throw new ApiError(status.BAD_REQUEST, 'Invalid semister Code');
  }
  const result = await AcademicSemister.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteSemister = async (
  id: string
): Promise<IAcademicSemister | null> => {
  const result = await AcademicSemister.findByIdAndDelete(id);
  return result;
};
export const AcademicSemisterService = {
  createSemister,
  getAppAcademicSemister,
  getSingleSemister,
  updateSemister,
  deleteSemister,
};
