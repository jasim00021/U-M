import { IAcademicSemister } from '../academicSemister/academicSemister.interface';
import { AcademicFaculty } from '../faculty/faculty.model';
import { IAcademicSemisterYearAndCode } from './user.interface';
import { User } from './user.model';

export const findLastStudentId = async () => {
  const lastStudentId = await User.findOne(
    { role: 'student' },
    { id: 1, _id: 0 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastStudentId?.id ? lastStudentId?.id?.toString().substring(4) : null;
};

export const getStudentId = async (
  academicSemister: IAcademicSemisterYearAndCode
) => {
  const currentId =
    (await findLastStudentId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `${academicSemister.year.substring(2)}${
    academicSemister.code
  }${incrementId}`;
  console.log('incrementId', incrementId);
  return incrementId;
};
export const findLastFacultyId = async (): Promise<string | undefined> => {
  const lastFacultyId = await User.findOne(
    {
      role: 'faculty',
    },
    { _id: 0, id: 1 }
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  return lastFacultyId?.id
    ? lastFacultyId?.id.toString().substring(2)
    : undefined;
};

export const generateFacultyId = async () => {
  const currentId =
    (await findLastFacultyId()) || (0).toString().padStart(5, '0');
  let incrementId = (parseInt(currentId) + 1).toString().padStart(5, '0');
  incrementId = `$F-${incrementId}`;
  return incrementId;
};
