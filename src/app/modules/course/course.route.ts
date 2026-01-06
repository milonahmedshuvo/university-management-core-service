import express from 'express'
import { courseController } from './course.controller'

const router = express.Router()

router.post('/', courseController.insertIntoDB)
router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getCourseById)
router.delete('/:id', courseController.deleteCourseByid)
router.patch('/:id', courseController.updateOneInDB)
router.post('/:id/assign-facalties',  courseController.facultyAssign)


export const courseRoute = router;