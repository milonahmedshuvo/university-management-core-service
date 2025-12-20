import express from 'express'
import validateRequest from '../../middlewares/validateRequest'
import { academicSemesterControllers } from './academicSemester.controller'
import { academicSemesterValidation } from './academicSemester.validation'

const router = express.Router()

router.post('/',
     validateRequest(academicSemesterValidation.create),
     academicSemesterControllers.insertToBD
    )

router.get('/', academicSemesterControllers.getAllFromDB)
router.get('/:id', academicSemesterControllers.getDataById)

export const academicSemesterRoute = router