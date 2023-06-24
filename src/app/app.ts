import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import globalErrorHandler from './middleware/globalErrorHandler';
import { UserRoutes } from './modules/users/user.routes';
import { errorlogger } from '../shared/logger';
import { AcademicRouter } from './modules/academicSemister/academicSemister.routes';
import routes from './routes';
import httpStatus from 'http-status';
import { generateFacultyId } from './modules/users/user.utils';
const app: Application = express();

app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.get('/', async (req: Request, res: Response) => {
  res.send('Hello World!');
  //   Promise.reject(new Error('Unhandled Promise Rejection'))
});
app.use('/api/v1', routes);

// Global Error Handler
app.use(globalErrorHandler);
// user Router
// app.use('/api/v1/user', UserRoutes);
// app.use('/api/v1/academic-semister', AcademicRouter);

// test;
const test = async () => {
  const id = await generateFacultyId();
  console.log('id', id);
};
test();

// page not found error modifing

app.use('*', (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Page not found',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'Page not found',
      },
    ],
  });
});

export default app;
