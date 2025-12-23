import express from 'express';
import { studentController } from './student.controller';

const router = express.Router()

router.post('/', studentController.insertIntoToDB)
router.get('/', studentController.getAllDataFromDB)
router.get('/:id', studentController.getDataByIdFromDB)

export const studentRoute = router;