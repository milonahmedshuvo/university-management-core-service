import express from 'express'
import { academicFacultyController } from './academicFaculty.controller'

const router = express.Router()

router.post('/', academicFacultyController.insertIntoToBD)
router.get('/', academicFacultyController.getAllDataFromDB)
router.get('/:id', academicFacultyController.getDataById)

export const academicFacultyRoute = router