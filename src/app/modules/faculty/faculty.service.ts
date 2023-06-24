import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse, IPaginationOption } from '../../interfaces/common';

import { IAcademicFaculty, IAcademicFacultySearch } from './faculty.interface';
import { AcademicFaculty } from './faculty.model';

const createFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.create(payload);
  return result;
};

const getAllFaculty = async (
  filter: IAcademicFacultySearch,
  pagination: IPaginationOption
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { searchTerm, ...filterData } = filter;

  //   if (searchTerm) {
  //     andCondition.push({
  //       $or: facultySearchable.map(field => ({
  //         [field]: {
  //           $regex: searchTerm,
  //           $options: 'i',
  //         },
  //       })),
  //     });
  //   }
  //   if (Object.keys(filterData).length) {
  //     andCondition.push({
  //       $and: Object.entries(filterData).map(([field, val]) => ({
  //         [field]: val,
  //       })),
  //     });
  //   }
  const andCondition = [
    {
      $or: [
        {
          title: { $regex: searchTerm, $options: 'i' },
        },
      ],
    },
  ];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition =
    searchTerm?.length > 0
      ? andCondition.length > 0
        ? { $and: andCondition }
        : {}
      : {};
  const result = await AcademicFaculty.find(whereCondition)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  console.log('result', result);
  return {
    meta: {
      page,
      limit,
      total: await AcademicFaculty.countDocuments(),
    },
    data: result,
  };
};

const getSingleFaculty = async (
  id: string
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findById(id);
  return result;
};

const updateFaculty = async (
  id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteFaculty = async (id: string): Promise<IAcademicFaculty | null> => {
  const result = await AcademicFaculty.findByIdAndDelete(id);
  return result;
};
export const FacultyService = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
