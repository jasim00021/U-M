import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
  statusCode: number;
  message: string;
  errorMessage: IGenericErrorMessage[];
};

export type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;

  meta?: {
    page: number;
    limit: number;
    total: number;
  };
  data?: T | null;
};
export type IGenericResponse<T> = {
  meta: {
    page?: number;
    limit?: number;
    total?: number;
    sortBy?: string;
    sortOrder?: string;
  };
  data: T;
};

export type IPaginationOption = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
};
