import express from 'express'
import { courseController } from './course.controller'

const router = express.Router()

router.post('/', courseController.insertIntoDB)
router.get('/', courseController.getAllCourse)
router.get('/:id', courseController.getCourseById)
router.delete('/:id', courseController.deleteCourseByid)
router.patch('/:id', courseController.updateOneInDB)


export const courseRoute = router;