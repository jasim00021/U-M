import { Router } from 'express';
import { UserRoutes } from '../modules/users/user.routes';
import { AcademicRouter } from '../modules/academicSemister/academicSemister.routes';
import globalErrorHandler from '../middleware/globalErrorHandler';
import { FacultyRouter } from '../modules/faculty/faculty.routes';
import { DepartmentRouter } from '../modules/department/department.routes';

const router = Router();

const moduleRoutes = [
  {
    path: '/user',
    route: UserRoutes,
  },
  {
    path: '/academic-semister',
    route: AcademicRouter,
  },
  {
    path: '/faculty',
    route: FacultyRouter,
  },
  {
    path: '/department',
    route: DepartmentRouter,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

// router.use('/user', UserRoutes);
// router.use('/academic-semister', AcademicRouter);

export default router;
