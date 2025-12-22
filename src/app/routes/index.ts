import express from 'express';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: "/user-create",
    route: userRoutes
  },
  {
    path: "/user",
    route: userRoutes
  },
  {
    path: "/academic-semester",
    route: academicSemesterRoute
  },
  {
    path: "/academic-faculty",
    route: academicFacultyRoute
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
