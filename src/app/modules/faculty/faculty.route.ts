import express from 'express'
import { facultyController } from './faculty.controller'

const router = express.Router()

router.post('/', facultyController.insertIntoToDB)
router.get('/', facultyController.getAllDataFromDB)
router.get('/:id', facultyController.getDataByIdFromDB)
router.post('/:id/assign-courses', facultyController.assignCourse)
router.post('/:id/remove-courses', facultyController.removeCourse)


export const facultyRoute = router