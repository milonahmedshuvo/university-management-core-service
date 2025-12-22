import express from 'express'
import { academicDepartmentController } from './academicDepartment.controller'

const router = express.Router()

router.post('/', academicDepartmentController.insertIntoToDB)
router.get('/', academicDepartmentController.getAllDataFromDB)
router.get('/:id', academicDepartmentController.getDataById)

export const academicDepartmentRoute = router;