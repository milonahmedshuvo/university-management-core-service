import express from 'express'
import { facultyController } from './faculty.controller'

const router = express.Router()

router.post('/', facultyController.insertIntoToDB)
router.get('/', facultyController.getAllDataFromDB)
router.get('/:id', facultyController.getDataByIdFromDB)


export const facultyRoute = router