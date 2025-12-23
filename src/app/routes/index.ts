import express from 'express';
import { academicDepartmentRoute } from '../modules/academicDepartment/academicDepartment.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicSemesterRoute } from '../modules/academicSemester/academicSemester.route';
import { facultyRoute } from '../modules/faculty/faculty.route';
import { studentRoute } from '../modules/student/student.route';
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
  },
  {
    path: "/academic-department",
    route: academicDepartmentRoute
  },
  {
    path: '/student',
    route: studentRoute
  },
  {
    path: '/faculty',
    route: facultyRoute
  }
];



moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
