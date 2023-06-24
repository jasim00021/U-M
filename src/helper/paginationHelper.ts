import { SortOrder } from 'mongoose';

type IOptions = {
  page: number;
  limit: number;
  sortBy: string;
  sortOrder: SortOrder;
};
type IOptionReturn = {
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: SortOrder;
};

const calculatePagination = (paginationOption: IOptions): IOptionReturn => {
  const page = Number(paginationOption.page || 1);
  const limit = Number(paginationOption.limit || 10);
  const skip = (page - 1) * limit;
  const sortBy = paginationOption.sortBy || 'createdAt';
  const sortOrder = paginationOption.sortOrder || 'desc';
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelper = {
  calculatePagination,
};
