import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelper } from '../../../helper/paginationHelper';
import { IGenericResponse, IPaginationOption } from '../../interfaces/common';
import { IDepartment, IDepartmentSearch } from './department.interface';
import { Department } from './department.model';
import { departmentSearchable } from './department.constant';

const createDepartment = async (payload: IDepartment): Promise<IDepartment> => {
  const result = await Department.create(payload);
  return result;
};

const getAllDepartment = async (
  filter: IDepartmentSearch,
  pagination: IPaginationOption
): Promise<IGenericResponse<IDepartment[]>> => {
  const { searchTerm, ...filterData } = filter;
  let andCondition = [];
  if (searchTerm) {
    andCondition.push({
      $or: departmentSearchable.map(field => ({
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
  //   const andCondition = [
  //     {
  //       $or: [
  //         {
  //           title: { $regex: searchTerm, $options: 'i' },
  //         },
  //       ],
  //     },
  //   ];
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelper.calculatePagination(pagination);

  const sortCondition: { [key: string]: SortOrder } = {};
  if (sortOrder && sortBy) {
    sortCondition[sortBy] = sortOrder;
  }
  const whereCondition = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Department.find(whereCondition)
    .populate('academicFaculty')
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);
  console.log('result', result);
  return {
    meta: {
      page,
      limit,
      total: await Department.countDocuments(),
    },
    data: result,
  };
};

const getSingleDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findById(id);
  return result;
};

const updateDepartment = async (
  id: string,
  payload: Partial<IDepartment>
): Promise<IDepartment | null> => {
  const result = await Department.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteDepartment = async (id: string): Promise<IDepartment | null> => {
  const result = await Department.findByIdAndDelete(id);
  return result;
};
export const DepartmentService = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
