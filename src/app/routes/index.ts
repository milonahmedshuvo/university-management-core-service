import express from 'express';
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
  }
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
